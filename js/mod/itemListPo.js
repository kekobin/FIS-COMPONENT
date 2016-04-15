var liveCard = require('/components/liveCard');

var itemListPo = {
    screenshot: function(screenshortUrls){
        if(screenshortUrls && typeof screenshortUrls === 'string'){
            return screenshortUrls.split(",")[0];
        }
        return "http://www.huya.com/live2/statics/img/default_live.jpg";
    },
    introduction : function(introduction,roomName){
        roomName = this.xss(roomName);

        return introduction ? introduction : (roomName || '游戏直播间')
    },
    xss: function (msg) {
        if (typeof msg !== 'string') return msg;

        msg = msg.replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\'/g, '&#39;')
                .replace(/\"/g, '&quot;');

        return msg;        
    },
    
    showPage : function(type){
        if (this.isLoadedAll) {
            return
        }

        if (this.total == 0 || this.showNum >= this.total) {
            this.loadedCallback();
            return
        }

        var _this = this;
        var moreBtnId = $("#"+type+"_more");
        var onePageData = this.pageReadData();

        var fragmentHTML = [];

        for(var i=0,len=onePageData.length; i<len; i++){
            var item = onePageData[i];

            var record = "";
            if(type == 'games'){
                record = _this.oneRecord4Game(item);
            }else if(type == 'lives' || type == 'tvs' || type == 'lives1' || type == 'lives2'){
                record = _this.oneRecord4Live(item,type);
            }else if(type == 'bueaties'){
                record = _this.oneRecord4Bueaty(item);
            }else if(type == 'celebrities'){
                record = _this.oneRecord4Celebrity(item);
            }else{
                return;
            }
            fragmentHTML.push(record)

            //设置将该页面记录添加到哪里
            _this.showNum++;
        }

        this.page++;

        $("#"+_this.itemsId).append( fragmentHTML.join('') );
        ww.scrollbar.api.reInit();

        if (_this.showNum >= _this.total) {
            this.loadedCallback(type)
        }
    },

    loadedCallback: function (type) {
        var msg = "直播";

        if(type == 'games'){
            msg = "游戏";
        }else if(type == "bueaties"){
            msg = "美女";
        }else if(type == "tvs"){
            msg = "电视";
        }else if(type == "celebrities"){
            msg = "名人";
        }

        clearInterval(this.t);
        this.isLoadedAll = true;
        var moreBtnId = $("#"+this.type+"_more");
        moreBtnId.unbind();
        moreBtnId.text("已经加载完全部"+ this.total +"个"+msg);
    },

    /**
     * 模板
     */
    oneRecord4Celebrity : function(item){
        var _this = this;
        var id_num = '';

        //拆取标签
        var tag = item.getIntroduce.split('，');
        var tags = '';
        var tagColor = ['blue','red','yellow','gray'];
        var tagColorIndex = 0;
        for(var i = 0;i < tag.length;i++){
            if(tagColorIndex != 3){
                tagColorIndex++;
            }else{
                tagColorIndex = 0;
            }
            tags += '<span class="title-tag title-tag--'+tagColor[tagColorIndex]+'" title="'+tag[i]+'">'+tag[i]+'</span>'
        }

        var record = [
            '<li class="star-list-item clearfix">',
                '<a hiido_code="10004367" class="star-pic hiido_stat" onclick="' +(item.isLive == true ? 'ww.open(\''+item.getCid+'\',\''+item.getSubCid+'\')' : 'return false')+ ';" href="#">',
                '<img src="'+item.getPic+'" alt="'+this.xss(item.getNick)+'" onerror="this.onerror=\'\';this.src=\'http://assets.dwstatic.com/amkit/p/duya/common/img/default_profile.jpg\'">',
                '<p class="star-hostName">'+this.xss(item.getNick)+'</p></a>',
                '<div class="star-detail">',
                    '<h4><a hiido_code="10004367" class="hiido_stat" href="#" onclick="'+ (item.isLive == true ? 'ww.open(\''+item.getCid+'\',\''+item.getSubCid+'\')' : 'return false') +';" >'+this.xss(item.getTitle)+'</a></h4>',
                    '<div class="famous-main">',
                        '<div class="main-tag">',
                            tags,
                        '</div>',
                    '</div>',
                    '<h6>'+this.xss(item.getDescription)+'</h6>',
                    (function(item){
                        if(item.isLive == true){
                            return '<p><span>正在直播：</span><a hiido_code="10004373" href="'+_this.appUrl+'wonderful/nosession.php?m=Live&gid='+item.getGid+'&gName='+this.xss(item.getgName)+'" class="star-game-type hiido_stat">'+this.xss(item.getgName)+'</a><span class="txt"><i class="icon-p"></i>'+ww.format(item.getTotalCount)+'个观众</span></p>';
                        }else if(item.getActivityStatus == true){
                            return '<p class="celebrity_'+item.getActivityId+'_p"><span class="subscribe-num">'+ww.format(item.getActivityCount)+'</span><a href="#'+id_num+'" onclick="dy.activitySubscribe('+item.getActivityId+',\'Cancel\','+item.getActivityCount+',\''+id_num+'\')" class="subscribe-btn finish-sub">已订阅</a></p>';
                        }else{
                            return '<p class="celebrity_'+item.getActivityId+'_p"><span class="subscribe-num">'+ww.format(item.getActivityCount)+'</span><a href="#'+id_num+'" onclick="dy.activitySubscribe('+item.getActivityId+',\'Subscribe\','+item.getActivityCount+',\''+id_num+'\')" class="subscribe-btn">订阅</a></p>';
                        }
                    }).call(this, item),
                '</div>',
            '</li>'
        ];

        return record.join('');
    },
    
    oneRecord4Game : function(item){
        var _this = this;
        var record = [
            '<li class="game-list-item">',
                '<a href="'+_this.appUrl+'wonderful/nosession.php?m=Live&gid='+item.gid+'&gName='+this.xss(item.gameFullName)+'" title="'+this.xss(item.gameFullName)+'">',
                    '<img src="'+_this.cdnUrl+'/game/'+item.gid+'-L.jpg" onerror="this.onerror=\'\';this.src=\'http://img.live.yy.com/cdnimage/game/default_game_pc.jpg\'" alt="'+this.xss(item.gameFullName)+'" >',
                    '<p>'+this.xss(item.gameFullName)+'</p>',
                '</a>',
            '</li>'
        ];

        return record.join('');
    },
    
    oneRecord4Bueaty : function(item){
        var _this = this;
        var record = [
            '<li class="girl-list-item">',
                '<a href="#" hiido_code="10004369" onclick="ww.open(\''+item.getChannel+'\',\''+item.getLiveChannel+'\')" class="pic hiido_stat"><span class="avatar-show"><img src="'+item.getAvatar+'" alt="'+this.xss(item.getNick)+'"  onerror="this.onerror=\'\';this.src=\'http://www.huya.com/live2/statics/img/default_profile.jpg\'" alt=""></span>',
                    (item.getCameraOpen == 1 ? '<i class="icon-vlive"></i>' : ''),
                '</a>',
                '<a href="#" hiido_code="10004369" onclick="ww.open(\''+item.getChannel+'\',\''+item.getLiveChannel+'\')" class="title hiido_stat"><i class="icon-level level-'+item.getLevel+'"></i>'+this.xss(item.getNick)+'</a>',
                '<span class="info">正在直播：<a hiido_code="10004373" href="'+_this.appUrl+'wonderful/nosession.php?m=Live&gid='+item.getGid+'&gName='+this.xss(item.getGameFullName)+'" class="hiido_stat"><em>'+this.xss(item.getGameFullName)+'</em></a></span>',
                '<span class="txt"><i class="icon-p"></i>'+ww.format(item.getTotalCount)+'个观众</span>',
            '</li>'
        ];

        return record.join('');
    },
    param: ww.dequery(),
    oneRecord4Live : function(item,type){
        var data = {
            recommendTag: item.getRecommendStatus,
            recommendTagName: item.getRecommendName,
            recommendTagColor: item.getColor,
            channel: item.getChannel,
            liveChannel: item.getLiveChannel,
            liveSourceType: item.liveSourceType,
            privateHost: item.privateHost,
            screenType: item.screenType,
            screenshot: item.getScreenshortUrls,
            nick: item.getNick,
            introduction: item.getIntroduction,
            totalCount: item.getTotalCount,
            gid: item.getGid,
            gameFullName: item.getGameFullName
        }

        return '<li>'+ liveCard.tpl({ data: data, cfg: {showGame: !this.param.gid} }) + '</li>'
    },
    
    /**
    * 分页读取内存json中的数据
    * json 内存中全部数据
    * page 页码
    * pageSize 每页大小
    */
    pageReadData : function(){
       var min = (this.page-1)*this.pageSize ;
       var max = this.page*this.pageSize;

       return this.itemListData.slice(min, max);
    },
    
    init: function(itemListData ,type , pageSize,appUrl,cdnUrl,liveUrl) {
        if(itemListData && (!(itemListData instanceof Array ) ) ){
            itemListData = (function(o){

                var arr = [];
                for(var i in o){
                    arr.push(o[i]);
                }
                return arr;

            })(itemListData);
        }

        var _self = this;

        this.liveUrl = liveUrl;
        this.cdnUrl = cdnUrl;
        this.appUrl = appUrl;
        this.pageSize = pageSize;
        this.page = 1;
        this.showNum = 0;
        this.type = type;
        this.itemListData = itemListData;
        this.total = itemListData == undefined ? 0 : itemListData.length;
        this.itemsId = type+"_items_id";
        $("#"+this.itemsId).html("");
        this.showPage(type);

        var moreBtn = $("#"+this.type+"_more");

        ww.scrollbar.on('jsp-scroll-y', ww.debounce(function(event, scrollPositionY, isAtTop, isAtBottom){
                isVisible(moreBtn, scrollPositionY) && _self.showPage(type)
        }, 80));

        function isVisible (elm, scrollTop, threshold) {
            threshold = threshold || 200;
            return elm.offset().top < ( $(window).height() + threshold )
        }
    }
};

var  _init = itemListPo.init;

itemListPo.init = function () {
    var args = arguments
    var _this = this
    
    $(function(){
        _init.apply(_this, args)
    })
};



/*
 * 异步获取全部直播页面的分页数据
 */
itemListPo.livesInit = function(domain, firstPage){
    var prevPage = firstPage || [];
    var box = $('#lives_items_id');
    var moreBtn = $('#lives_more');
    var index = 2;    // 第一页的数据已同步输出
    var isLoadedAll = false;
    var isPending = false;

    ww.scrollbar.on('jsp-scroll-y', ww.debounce(function(event, scrollPositionY, isAtTop, isAtBottom){
        isVisible(moreBtn, scrollPositionY) && getDate()
    }, 80));

    function isVisible (elm, scrollTop, threshold) {
        threshold = threshold || 500;
        return elm.offset().top < ( $(window).height() + threshold )
    }

    function getDate (){
        if (isLoadedAll) return;
        if (isPending) return;

        isPending = true;

        $.ajax({
            type: 'GET',
            url: domain + 'wonderful/nosession.php' + location.search + '&do=ajaxLiveData',
            data: {page: index, pageSize: 30},
            dataType: 'JSON'
        })
        .done(function(res){
            if (res.status == 1000) {
                if (typeof res.result === 'string') {
                    res.result = $.parseJSON(res.result)
                }

                if (res.result && res.result.length < 30) {
                    isLoadedAll = true
                }

                render(res.result)
                prevPage = res.result
                index++;
            } else {
                try {
                    console.log('获取更多数据失败：' + res.message)
                } catch (e) {}
            }
        })
        .fail(function(e, code){
            try {
                console.log('获取更多数据失败：' + code)
            } catch (e) {}
        })
        .always(function(){
            isPending = false
        })
    }

    function render (list) {
        var html = []

        $.each(list, function (i, item){
            // 相邻分页数据去重
            for (var j = 0, l = prevPage.length; j<l; j++) {
                if (item.getYyId === prevPage[j].getYyId) return;
            }

            html.push( itemListPo.oneRecord4Live(item, 'lives') )
        })

        box.append( html.join('') )

        if (isLoadedAll) {
            $('#lives_more').text("已经加载完全部"+ box.find('.J_liveMod').length +"个直播")
        }

        ww.scrollbar.api.reInit();
    }
};



/*
 * 异步获取四大分类页面的分页数据
 */
itemListPo.lives3Init = function(domain, firstPage, gid){
    var prevPage = firstPage || [];
    var box = $('#lives_items_id');
    var moreBtn = $('#lives_more');
    var index = 2;    // 第一页的数据已同步输出
    var isLoadedAll = false;
    var isPending = false;

    ww.scrollbar.on('jsp-scroll-y', ww.debounce(function(event, scrollPositionY, isAtTop, isAtBottom){
            isVisible(moreBtn, scrollPositionY) && getDate()
    },80));

    function isVisible (elm, scrollTop, threshold) {
        threshold = threshold || 500;
        return elm.offset().top < ( $(window).height() + threshold )
    }

    function getDate (){
        if (isLoadedAll) return;
        if (isPending) return;

        isPending = true;

        $.ajax({
            type: 'GET',
            url: domain + 'wonderful/cache.php?m=Game&do=ajaxCategory',
            data: {gid: gid, page: index},
            dataType: 'JSON'
        })
        .done(function(res){
            if (res.status == 1000) {
                var result = (res.data && res.data.list) ? res.data.list : [];

                if (typeof result === 'string') {
                    result = $.parseJSON(result)
                }

                if (result.length < 20) {
                    isLoadedAll = true
                }

                render(result)
                prevPage = result
                index++;
            } else {
                try {
                    console.log('获取更多数据失败：' + res.message)
                } catch (e) {}
            }
        })
        .fail(function(e, code){
            try {
                console.log('获取更多数据失败：' + code)
            } catch (e) {}
        })
        .always(function(){
            isPending = false
        })
    }

    function render (list) {
        var html = []

        $.each(list, function (i, item){
            // 相邻分页数据去重
            for (var j = 0, l = prevPage.length; j<l; j++) {
                if (item.channel === prevPage[j].channel && item.liveChannel === prevPage[j].liveChannel) return;
            }

            html.push( 
                '<li>'+
                liveCard.tpl({
                    data: item
                }) +
                '</li>'
            )
        })

        box.append( html.join('') )

        if (isLoadedAll) {
            $('#lives_more').text("已经加载完全部"+ box.find('.J_liveMod').length +"个直播")
        }

        ww.scrollbar.api.reInit();
    }
};

module.exports = itemListPo
