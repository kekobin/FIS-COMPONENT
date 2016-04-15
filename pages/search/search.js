require('/components/backToTop');
require('/components/liveCard');
require('/js/mod/subscribe');

var Helper = require('/js/mod/helper');
var report = require('/js/mod/report');

var onViewportChange = ww.resize;


ww.getUid(function(uid){
    window.userUid = uid
});

// 补全 url （异步生成的元素自己手动补。。。）
$(function(){        
    $('.more-game').each(function(i, a){
        ww.attachUid(a)
    })
})

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

setInterval(function(){
	ww.scrollbar.api.reInit()
}, 300)

// 搜索关键字标红
window.huya_skwHandler = function (kw, str) {
	if (typeof str !== 'string') {
		return str
	}

	// 标记搜索关键字
	var reg = new RegExp( '('+kw+')' , 'g');

	return str.replace(reg, function(s, $1) {
		return '<b style="color:#f32d1e;">'+ $1 +'</b>'
	})
}

//过滤特殊字符
window.$keywordProcess = function(str){
    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };
    var regKeywordHighlight = window.REG_KEYWORD_HIGHLIGHT;

    if (str) {
        if (typeof str != 'string') {
            str = str.toString();
        }
        str = str.replace(/&(?![\w#]+;)|[<>"']/g, function(s) {
            return escapeMap[s];
        });
        if (regKeywordHighlight) {
            str = str.replace(regKeywordHighlight, '<em class="type-keyword">$1</em>');
        }
    }

    str = str.replace(/[\u2028\u2029]/g, ' ');

    return str;
}

var test = ww.type === 1 ? 'test.' : '';

window.searchUtil = {

	searchBar  : $("#search-bar"),
	searchInput: $("#search-bar input"),
	searchList : $("#search-bar .search-list"),
	searchListLi: $("#search-bar .search-list li"),
	historySearchList: $("#historySearch"),

	HISTORY_RESULT_KEY: "historyResult",

	getHotWordUrl: "http://"+ test +"www.huya.com/index.php?m=Search&do=getHotword", //获取搜索热词URL

	getRelevanceUrl: "http://"+ test +"www.huya.com/member/index.php?m=Search&do=getSearchContent", //获取相关游戏，相关主播URL

	searchUrl: "http://search.huya.com/?m=Search&do=getSearchContent", //搜索URL

	pageStart: 0,	//初始记录

	pageSize: 50,	//每页大小

	keyWord: '', //搜索关键词

	scrollLoad: 1, //是否滚动加载

	template: {

		//最近热搜
		hotWord: __inline("/tpl/search-bar/hotWord.tpl"),

		//最近搜索
		historySearch: __inline("/tpl/search-bar/historySearch.tpl"),

		//相关游戏
		relevanceGame: __inline("/tpl/search-bar/relevanceGame.tpl"),

		//相关主播
		relevanceAnchor: __inline("/tpl/search-bar/relevanceAnchor.tpl"),

		//搜索结果的主播
		resultAnchor: __inline("/tpl/search-bar/search-host.tpl"),

		//搜索结果中的直播
		resultLive: __inline("/tpl/search-bar/search-live.tpl"),

		//搜索结果中的游戏
		resultGame: __inline("/tpl/search-bar/search-game.tpl"),

		HotLive: __inline("./tpl/hotLive.tpl")

	},

	//初始化
	init: function(){
        this.bindEvent();
		this.getUrlHSK();
		this.submitSearch();
	},

	//获取URL中的查询关键字
	getUrlHSK: function(){
		var _this = this;
		var url = location.href;
		var index = url.indexOf("hsk");
		var hsk = "";
		if(index > -1) {
			hsk = url.slice(index + 4, url.length);
		}
		if(hsk.length > 0){
			_this.searchInput.val(decodeURIComponent(hsk));
		}
	},

	//创建html
	createHtml: function(type, data, id, fn) {
		var _this = this;
		var isAppend = data.isAppend; 	
		var tempHtml = _.template(_this.template[type])(data);
		if(isAppend) {
			$("#"+id).append(tempHtml);
		}else{
			$("#"+id).html(tempHtml);
		}
		
		fn && fn();
	},

	hotLive:function(data,id,type){
        var _this = this;
        _this.createHtml('HotLive', {list:data,type:type,isWideScreen:false},id, function(){
        	$('#'+id).find('.J_liveMod').createLiveCard()
        });
    },

	//获取热门搜索
	getHotWord: function(cb){
		var _this = this;
		$.ajax({
			url: _this.getHotWordUrl,
			dataType: 'jsonp',
			success: function(result){

				var newResult = [];

				var historyResult = storage.get("historyResult") || []; 
				var len = result.length - historyResult.length;
				len = isNaN(len) ? 10 : len;
				for(var i = 0; i < len; i++) {
					newResult[i] = result[i];
				}
				_this.createHtml("hotWord",{list:newResult},"hotWord",cb);
			}
		});
	},

	//获取相关游戏，相关主播
	getRelevance: function(keyword, cb) {
		var _this = this;
		$.ajax({
			url: _this.getRelevanceUrl,
			dataType: 'jsonp',
			data: {
				uid: window.userUid || ' ',	//如果用户有登录，则使用UID
				q: keyword,					//关键词
				typ: -6,					//自动补全标识
				app: 11						//游戏直播
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

	//获取历史记录
	getHistorySearch: function(cb){
		var _this = this;
		var historyResult = storage.get("historyResult");
		if( historyResult !== null  && typeof historyResult !== "undefined" && historyResult.length > 0) {
			
			if(historyResult.length < 11){
				_this.createHtml("historySearch",{list:historyResult},"historySearch",cb);

			}else{
				_this.createHtml("historySearch",{list:historyResult.slice(0,10)},"historySearch",cb);
			}

			
		}
	},

	//搜索
	submitSearch: function(type) {
		var _this = this;
		var kw = _this.searchInput.val();

		var temp = $.trim(kw);
		//是否拼接
		var isAppend = true;

		if(temp.length === 0){
			kw = "";
		}

		if(kw === "主播、频道、游戏") {
			kw = "";
		}

		//检测到关键词不同
		if(kw !== _this.keyWord) {
			_this.keyWord = kw;
			_this.pageStart = 0;
			isAppend = false;
		}

		//添加到历史记录
		var r = storage.get(_this.HISTORY_RESULT_KEY);
		r = r ? r : [];
		var rs = r.join();
		var index = myIndexOf(r,kw);
		if(index === -1 && kw.length > 0){
			r.unshift(kw);
			storage.set(_this.HISTORY_RESULT_KEY,r);
		}

		//显示正在加载数据
		$(".loading").show();

		//获取数据
		$.ajax({
			url: _this.searchUrl,
			data: {
				from: 'wonderLive',
				uid: window.userUid || ' ',
				app: 11,					//游戏直播
				v: 1,						
				typ: -5, 					//游戏直播搜索标识
				rows: _this.pageSize,
				start: _this.pageStart,
				q: kw                       //关键词
			},
			dataType: 'jsonp',
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
					noSearchResult()
					return
				}

				if(type === _this.scrollLoad) {
			
					//直播
					var liveList = result.response[3] ? result.response[3].docs : [];

					_this.createHtml("resultLive",{list:liveList},"resultLive", function(){
						if(liveList.length > 0){
							$("#liveLoading").hide();
							var liveMod = $('#resultLive').find('.J_liveMod').createLiveCard()

							// 关键字标红
							liveMod.find('.liveMod-gName').html(function(i, s){
								return huya_skwHandler(kw, s)
							})
							liveMod.find('.liveMod-nick').html(function(i, s){
								return huya_skwHandler(kw, s)
							})
						}else{
							$("#liveLoading i").hide();
							$("#liveLoading span").html("已加载完全部数据");
						}
					});

					$("#anchorLoading").hide();
					$("#gameLoading").hide();
				}else{

					//主播
					var anchorList = result.response[1] ? result.response[1].docs : [];

					if(anchorList.length > 4) {
						$("#anchorSpread").show();
						$('#un_anchorSpread').hide();
					}else if(anchorList.length <= 4 && anchorList.length > 0){
						$("#anchorSpread,#un_anchorSpread").hide();
					}
					if(anchorList.length > 0){
						$(".search-result .anchor ul").addClass("single");
					}
					_this.createHtml("resultAnchor",{"list":anchorList, skw: kw},"resultAnchor", function(){
						if(anchorList.length > 0){
							$("#anchorLoading").hide();
							$(".result-container.anchor").show();

							// 订阅
							$('.J_anchorSub').each(function(){
								var anchor = $(this),
									aid = anchor.data('aid');

								// 如果在直播中就不显示订阅按钮
								if (!aid || anchor.find('.label').length) return;

								subscribe({
									aid: aid,
									init: function (subed) {
										var self = this;
										var btn = $('<a class="label" href="#"></a>');

										btn.click(function(){
											self.gan()
										})

										change(subed)
										self.change(change)

										btn.appendTo(anchor)

										function change (subed) {
											if (subed) {
												btn.addClass('disabled').text('已订阅')
											} else {
												btn.removeClass('disabled').text('订阅')
											}
										}
									}
								})
							})
						}else{
							$(".result-container.anchor").hide();
							$("#anchorLoading i").hide();
							$("#anchorLoading span").html("暂时没有数据");
						}
					});

					//游戏
					var gameList = (result.response[1024] && result.response[1024].docs) || [];

					_this.createHtml("resultGame",{"list":gameList, skw: kw},"resultGame", function(){
						if(gameList.length > 0){
							$("#gameLoading").hide();
							$(".result-container.game").show();
							
							var liveMod = $('#resultGame').find('.J_liveMod').createLiveCard()

							// 关键字标红
							liveMod.find('.liveMod-gName').html(function(i, s){
								return huya_skwHandler(kw, s)
							})
							liveMod.find('.liveMod-nick').html(function(i, s){
								return huya_skwHandler(kw, s)
							})
						}else{
							$(".result-container.game").hide();
							$("#gameLoading i").hide();
							$("#gameLoading span").html("暂时没有数据");
						}
					});

					//直播
					var liveList = result.response[3] ? result.response[3].docs : [];

					if(liveList.length === 0) {
						isAppend = false;
					}

					_this.createHtml("resultLive",{"list":liveList},"resultLive", function(){
						if(liveList.length > 0){
							$(".result-container.live").show();
							$("#liveLoading").hide();

							var liveMod = $('#resultLive').find('.J_liveMod').createLiveCard()

							// 关键字标红
							liveMod.find('.liveMod-gName').html(function(i, s){
								return huya_skwHandler(kw, s)
							})
							liveMod.find('.liveMod-nick').html(function(i, s){
								return huya_skwHandler(kw, s)
							})
						}else{
							$(".result-container.live").hide();
							$("#liveLoading i").hide();
							$("#liveLoading span").html("已加载完全部数据");
						}
					});

					if(anchorList.length === 0 && gameList.length === 0 && liveList.length === 0) {
						noSearchResult()
					}

					function noSearchResult () {
						$(".result-container").hide();
						$('#noResultTips').show();

						try {
							ya.reportProductEvent({
					            eid: 'click/jingcaishijie/sousuo/wujieguo',  //产品给的
					            eid_desc: '点击/精彩世界/无搜索结果页'  //产品给的
					        });
						} catch(e) {}

						Helper.getRemoteJsonData(Helper.Urls.RecommLive,null,function(d){
			                if(d.status==1000){
			                    //推荐直播
			                    _this.hotLive(d.result.data,'recommendLive','recommendLive');
			                }
			            });
					}
				}

			}
		});
	},
    //获取字符长度（中文字符；2，英文字符：1）
	getStringCodeLength: function(str){
		if(typeof str == "undefined" || str.length == 0) return 0;
		var unicode = 0;
		for(var i = 0, len = str.length; i < len; i++){
			if(str.charCodeAt(i) < 127){
				unicode += 1;
			}else{
				unicode += 2;
			}
		}
		return unicode;
	},
	bindEvent: function(){
		var _this = this,
			searchInput = _this.searchInput,
			searchList = _this.searchList,
			historySearchList = _this.historySearchList,
			del_his_timer;

		//搜索框获得焦点或内容改变时触发
		function onFocusAndChange(){
			var that = _this;
			var kw = searchInput.val();

			$(".relevance").hide();
			$(".history,.hot").hide();

			if(typeof kw === "undefined" || kw.length === 0 || kw === "主播、频道、游戏") {
				searchInput.val("");

				that.getHistorySearch(function(){
					$('#historySearchContainer').show();
					searchList.on('mouseenter',function(){
						searchInput.off('focusout');
					}).on('mouseleave',function(){
						searchList.hide();
					});
				});

				that.getHotWord(function(){
					
					if($('#historySearch li').length < 11){
						$("#hotWordContainer").show();
					}else{
						$("#hotWordContainer").hide();
					}		

				});

			}else{

				if(kw.length > 100){
					kw = kw.substr(0,100);
					searchInput.val(kw);
					return;
				}

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
				searchInput.val("主播、频道、游戏").css("color","#999");
			}

			setTimeout(function(){
				searchList.hide();
			},200);

		}).on("keyup",function(){
			onFocusAndChange();
		});

		//回车搜索
		searchInput.on("keyup", function(event){
			var keycode = event.which;
			if(keycode === 13){

				//上报，等同直接点击搜索按钮
                try {
                    ya.reportProductEvent({
                        eid: 'click/jingcaishijie/sousuoanniu',  //产品给的
                        eid_desc: '点击/精彩世界/搜索按钮点击'  //产品给的
                    });
                } catch(e) {}
                
				_this.submitSearch();
			}
		});

		//点击搜索
		$("#searchBtn").on("click",function(){
			_this.submitSearch();
		});

		//从历史记录中删除关键字
		historySearchList.on("click", ".close-icon", function(event){
			event.stopPropagation();
			var $this = $(this);
			var kw = $this.data("kw");
			var r = storage.get(_this.HISTORY_RESULT_KEY);
			r = r ? r : [];
			var index = myIndexOf(r,kw);
			r.splice(index, 1);
			storage.set(_this.HISTORY_RESULT_KEY,r);
			$this.parent("li").remove();
			if($("#historySearch li").length === 1) {
				$("#historySearchContainer").hide();
			}	
		});

		//选择关键词
		$(".search-history, .search-recommend").on("click", "li", function(){
			var $this = $(this);
			var kw = $this.data("kw");
			searchInput.val(kw).css("color","#000");
			_this.submitSearch();
		});

		//删除历史记录
		historySearchList.on("click",".remove-all-history span",function(event){
			event.stopPropagation();
			storage.remove(_this.HISTORY_RESULT_KEY);
			$('#historySearchContainer').hide();
		});

		//展开
		$("#anchorSpread").on("click", function(){
			$(this).hide();
			$('#un_anchorSpread').show();
			$(".search-result .anchor ul").toggleClass("spreading");
		});
		//收起
		$("#un_anchorSpread").on("click", function(){
			$(this).hide();
			$('#anchorSpread').show();
			$(".search-result .anchor ul").toggleClass("spreading");
		});
		//排序
		$(".order-panel span").on("click", function(){
			$(".order-panel span").removeClass("active");
			$(this).addClass("active");
		});

	}
}

searchUtil.init();



// 统计上报
report({
    rso: "from_jcsj", 
    rso_desc: "精彩世界",
    eid: "click/jingcaishijie/sousuoPV",  
    eid_desc:"点击/精彩世界/搜索结果页PV"
});