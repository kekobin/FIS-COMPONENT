/**
 * 精彩世界首页搜索JS
 *
 **/

(function(){

	var myIndexOf = function(arr, item) {
		arr = arr ? arr : [];
		var len = arr.length; 
		for(var i = 0; i < len; i++) {
			if(item == arr[i]){
				return i;
			}
		}
		return -1;
	}

	var test = ww.type === 1 ? 'test.' : '';

	window.searchUtil = {
		searchBar  : $("#search-bar"),
		searchInput: $("#search-bar input"),
		searchList : $("#search-bar .search-list"),
		searchListLi: $("#search-bar .search-list li"),
		historySearchList: $("#historySearch"),

		getHotWordUrl: "http://"+ test +"www.huya.com/index.php?m=Search&do=getHotword",	//获取今日热搜

		getRelevanceUrl: "http://"+ test +"www.huya.com/member/index.php?m=Search&do=getSearchContent",	//获取相关游戏，相关主播

		HISTORY_RESULT_KEY: "historyResult",

		template: {

			//最近热搜
			hotWord: __inline("/tpl/search-bar/hotWord.tpl"),

			//最近搜索
			historySearch: __inline("/tpl/search-bar/historySearch.tpl"),

			//相关游戏
			relevanceGame: __inline("/tpl/search-bar/relevanceGame.tpl"),

			//相关主播
			relevanceAnchor: __inline("/tpl/search-bar/relevanceAnchor.tpl")
		},

		init: function(){
			var _this = this;
			_this.bindEvent();
		},

		//拼接html
		createHtml: function(type, data, id, fn) {
			var _this = this;
			var tempHtml = _.template(_this.template[type])(data);
			$("#"+id).html(tempHtml);
			fn && fn();
		},

		//获取热门搜索
		getHotWord: function(cb){
			var _this = this;
			$.ajax({
				url: _this.getHotWordUrl,
				dataType: 'jsonp',
				success: function(result){
					var newResult = [];

					//减去历史搜索的个数
					var historyResult = storage.get(_this.HISTORY_RESULT_KEY) || []; 
					var len = result.length - historyResult.length;
					len = isNaN(len) ? 10 : len;
					for(var i = 0; i < len; i++) {
						newResult[i] = result[i];
					}
					_this.createHtml("hotWord",{list:newResult},"hotWord",cb);
				}
			});
		},

		//获取关键词的相关游戏，相关主播
		getRelevance: function(keyword, cb) {
			var _this = this;
			$.ajax({
				url: _this.getRelevanceUrl,
				dataType: 'jsonp',
				data: {
					uid: "",
					q: keyword,
					typ: -6,
					app: 11
				},
				success: function(result) {
					if (result && typeof result === 'string') {
						try {
							result = $.parseJSON(result)
						} catch (e) {
							window.console && window.console.log && window.console.log('json 格式错误');
							return
						}
					}

					if (!result || (result.responseHeader && result.responseHeader.status == -1)) {
						return
					}

					var relevanceGame, relevanceAnchor;
					
					if(result.response['1024'].docs.length > 0) {
						relevanceGame = result.response['1024'].docs;
						_this.createHtml("relevanceGame",{list:relevanceGame},"relevanceGame",cb);
						$("#relevanceGameContainer").show();
					}else if( result.response['1'].docs.length > 0) {
						relevanceAnchor = result.response['1'].docs;
						_this.createHtml("relevanceAnchor",{list:relevanceAnchor},"relevanceAnchor",cb);
						$("#relevanceAnchorContainer").show();
					}
				}
			});
		},

		//获取历史搜索记录
		getHistorySearch: function(cb){
			var _this = this;
			var historyResult = storage.get(_this.HISTORY_RESULT_KEY);
			if( historyResult !== null  && typeof historyResult !== "undefined" && historyResult.length > 0) {

				if(historyResult.length < 11){
					_this.createHtml("historySearch",{list:historyResult},"historySearch",cb);

				}else{
					_this.createHtml("historySearch",{list:historyResult.slice(0,10)},"historySearch",cb);
				}	

			}
		},

		//跳转到搜索页面
		gotoSearch: function(){
			var _this = this;
			var kw = _this.searchInput.val();
			var aEle = $("<a  href='javascript:;'></a>");
			aEle.on("click",function(){
				window.location.href = "./search.php?hsk="+encodeURIComponent(kw) ;
				return false;
			});
			aEle.trigger("click");
		},

		//事件绑定
		bindEvent: function(){
			var _this = this,
				searchInput = _this.searchInput,
				searchList = _this.searchList,
				historySearchList = _this.historySearchList;


			function onFocusAndChange(){
				var that = _this;
				var kw = searchInput.val() ;

				$(".relevance").hide();
				$(".history,.hot").hide();

				if(typeof kw === "undefined" || kw.length === 0 || kw === "主播、频道、游戏") {
					that.getHistorySearch(function(){
						$("#historySearchContainer").show();
						searchList.on('mouseenter',function(){
							searchInput.off('focusout');
						}).on('mouseleave',function(){
							searchList.hide();
						}).show();
					});

					that.getHotWord(function(){

						if($('#historySearch li').length < 11){
							$("#hotWordContainer").show();
						}else{
							$("#hotWordContainer").hide();
						}

					});

					searchInput.val("");

				}else{
					searchInput.css("color","#000");

					that.getRelevance(kw, function(){
						$(".search-title").show();
						$(".keyword").text('“ ' + kw + ' ”');
					});
					
				}

				searchList.show();
			}


			searchInput.on("focusin",function(){
				_this.searchBar.addClass("active");
				onFocusAndChange();

			}).on("focusout",function(){
				var kw = searchInput.val() ;
				_this.searchBar.removeClass("active");
				if(typeof kw === "undefined" || kw.length === 0) {
					searchInput.val("主播、频道、游戏");
					searchInput.css("color","#999");
				}
				setTimeout(function(){
					searchList.hide();
				},200);
			}).on("keyup",function(){
				onFocusAndChange();
			});

			//回车时检测历史搜索
			searchInput.on("keyup", function(event){
				var keycode = event.which;
				if(keycode === 13){
					_this.gotoSearch();
				}
			});

			//点击搜索按钮
			$("#searchBtn").on("click",function(){
				_this.gotoSearch();
			});

			//删除某条历史记录
			historySearchList.on("click", ".close-icon", function(){
				var kw = $(this).data("kw");
				var r = storage.get(_this.HISTORY_RESULT_KEY);
				r = r ? r : [];
				var index = myIndexOf(r,kw);
				r.splice(index,1);
				storage.set(_this.HISTORY_RESULT_KEY,r);
				$(this).parent("li").remove();
				
				if($("#historySearch li").length === 1) {
					$("#historySearchContainer").hide();
				}

				return false;
			});

			//删除所有历史记录
			historySearchList.on("click",".remove-all-history span",function(event){
				event.stopPropagation();
				storage.remove(_this.HISTORY_RESULT_KEY);
				$('#historySearchContainer').hide();
			});

			//点击选项跳转到搜索页面
			$(".search-history, .search-recommend,.search-history").on("click","li", function(){
				var $this = $(this);
				var kw = $this.data("kw");
				searchInput.val(kw).css("color","#000");
				_this.gotoSearch();
			});
			
		}
	}

	searchUtil.init();
})();