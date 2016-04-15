require('/components/backToTop');
var liveCard = require('/components/liveCard');
require('/components/searchBar');
require('/js/mod/jquery.SuperSlide');
require('/js/mod/dwslider');
var Helper = require('/js/mod/helper');
var report = require('/js/mod/report');
var rookie = require('./rookie');

var onViewportChange = ww.resize;

$(function(){        
    $('.game_href, .beauty_href').each(function(i, a){
        ww.attachUid(a)
    })
})

var Template = {
    ActiveLive:__inline('./tpl/ActiveLive.tpl'),               // 推荐位
    BeautyLive:__inline('./tpl/BeautyLive.tpl'),               // 美女模板
    HotLive:__inline('./tpl/HotLive.tpl'),                     // 推荐直播、热门直播、更多直播、某个游戏直播模板
    OtherGame:__inline('./tpl/OtherGame.tpl'),                 // 顶部右侧游戏导航模板
    NewWealth:__inline('./tpl/NewWealth.tpl')                 // 财富新贵模板
};

(function(Template){
    for (var p in Template) {
        if (Template.hasOwnProperty(p)) {            
            Template[p] = (function(str){
                var fn = null;

                return function () {
                    if (!fn) {
                        fn = _.template(str)
                    }

                    return fn.apply(this, arguments)
                }
            })( Template[p] )
        }
    }
})(Template);

Template.LiveMod = liveCard.tpl

var Index = function () {
    this.init();
};

$.extend(Index.prototype, {
    init: function () {
        var _this = this;

        // 虎牙新秀(非窄屏的时候才显示)
        (function(){
            var isFirst = true

            onViewportChange(function(type){
                if (type!==0 && isFirst) {
                    isFirst = false
                    rookie()
                }
            })
        })();

        // 财富新贵(非窄屏的时候才显示)
        (function(){
            var isFirst = true

            onViewportChange(function(type){
                if (type!==0 && isFirst) {
                    isFirst = false

                    Helper.getRemoteJsonData(Helper.Urls.ProfileWealthRank, null, function(d){
                        if(+d.status === 1000){
                            _this.newWealth(d.result.data);
                        }
                    });
                }
            })
        })();

        // 活动专区(非窄屏的时候才显示)
        (function(){
            var isFirst = true

            onViewportChange(function(type){
                if (type!==0 && isFirst) {
                    isFirst = false

                    Helper.getRemoteJsonData(Helper.Urls.ActiveLive,null,function(d){
                        if(+d.status==1000){
                            if(d.result.data.length>0){
                                _this.activeLive(d.result.data);
                            }else{$(".banner").remove();}
                        }
                    });
                }
            })
        })();

        // 美女专区 (位于可视区域才加载)
        (function(){
            var cache = []
            var once = false
            var box = $('#J_beauty')

            function render (data, screenType) {
                _this.createHtml(
                    'BeautyLive', 
                    {list: data, screenType: screenType}, 
                    'beautyLive', 
                    function(){
                        ww.scrollbar.api.reInit()

                        var view = $('#beautyLive')

                        view.find('li')
                        .on('mouseenter', function(e){
                            $(this).addClass('active')
                        })
                        .on('mouseleave', function(e){
                            $(this).removeClass('active')
                        })

                        // 打开客户端直播
                        view.on('click', '.J_enterLive', function(e){
                            e.preventDefault()

                            var data = $(this).closest('li').data();
                            ww.open(data.channel, data.livechannel)
                        })

                        // 默认图片
                        view.find('.pic img').one('error', function(e){
                            this.src = 'http://assets.dwstatic.com/amkit/p/duya/common/img/default_profile.jpg'
                        })
                    }, 
                    true
                );
            }

            function display () {
                if (once) {
                    return 
                }

                once = true;

                onViewportChange(function(type){   
                    if (type === 0) {         
                        if (cache[0]) {
                            render(cache[0], 0)
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.BeautyLive, {isWideScreen: 0}, function(d){
                                if(+d.status==1000){
                                    cache[0] = d.result.data
                                    render(cache[0], 0)
                                }
                            })
                        }
                    }
                    else if (type === 1) {
                        if (cache[1]) {
                            render(cache[1], 1)
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.BeautyLive, {isWideScreen: 1}, function(d){
                                if(+d.status==1000){
                                    cache[1] = d.result.data
                                    render(cache[1], 1)
                                }
                            })
                        }
                    } 
                    else {
                        if (cache[2]) {
                            render(cache[2], 2)
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.BeautyLive, {isWideScreen: 2}, function(d){
                                if(+d.status==1000){
                                    cache[2] = d.result.data
                                    render(cache[2], 2)
                                }
                            })
                        }
                    }
                })

            }

            if ( ww.isVisible(box, 200) ) {
                display()
            } else {
                ww.scrollbar.on('jsp-scroll-y', ww.throttle(function(event, scrollPositionY, isAtTop, isAtBottom){
                    if ( ww.isVisible(box, 200) ) display();
                }, 60))
            }
        })();

        // 热门直播 (位于可视区域才加载)
        (function(){
            var cache = []
            var once = false
            var box = $('#customArea')

            function render (data, screenType) {
                var html = '';
                var limitLen = screenType > 1 ? 4 : 3;

                for(var i = 0, len = data.length; i < len; i++) {
                    var o = data[i];
                    var list = o.data;

                    if(list.length < limitLen){
                        continue
                    }

                    html += 
                            '<div class="m-box-hd">'+
                                '<a class="m-tit game_href" href="yy://wonderworld-[tabPid=1002&tabSid=2006&uid=]">'+
                                    '<h3>'+ o.typeName +'</h3>'+
                                '</a>'+
                                '<a class="hd-more game_href clickstat" eid="click/jingcaishijie/remenzhibo/quanbu" eid_desc="点击/精彩世界/热门直播全部文字链接" href="yy://wonderworld-[tabPid=1002&tabSid=2006&uid=]">查看全部<i>&gt;</i></a>'+
                            '</div>';

                    html += '<div class="m-box-bd">'
                    html += '<div class="list-liveMod" eid="click/jingcaishijie/remenzhibo" eid_desc="点击/精彩世界/热门直播">'+
                                '<ul class="clickStatParent">';

                    $.each(list, function (j, item){
                        html += 
                            '<li class="clickstat" eid="click/jingcaishijie/remenzhibo/'+(j+1) +'" eid_desc="点击/精彩世界/热门直播/'+ (j+1) +'">'+ 
                                Template.LiveMod({data: item}) +
                            '</li>';
                    })

                    html += '</ul></div>';
                    html += '</div>';

                    html = '<div class="m-box">' + html + '</div>'
                }

                $('#customArea').html(html)
                                .find('.J_liveMod').createLiveCard();

                ww.scrollbar.api.reInit();

                // 补全url
                $('#customArea').find('.game_href').each(function(i, a){
                    ww.attachUid(a)
                })
            }

            function display () {
                if (once) {
                    return 
                }

                once = true;

                onViewportChange(function(type){   
                    if (type === 0) {
                        if (cache[0]) {
                            render(cache[0], 0)
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.CustomArea, {isWideScreen: 0}, function(d){
                                if(+d.status==1000){
                                    cache[0] = d.result
                                    render(cache[0], 0)
                                }
                            })
                        }
                    }
                    else if (type === 1) {
                        if (cache[1]) {
                            render(cache[1], 1)
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.CustomArea, {isWideScreen: 1}, function(d){
                                if(+d.status==1000){
                                    cache[1] = d.result
                                    render(cache[1], 1)
                                }
                            })
                        }
                    }
                    else {
                        if (cache[2]) {
                            render(cache[2], 2)
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.CustomArea, {isWideScreen: 2}, function(d){
                                if(+d.status==1000){
                                    cache[2] = d.result
                                    render(cache[2], 2)
                                }
                            })
                        }
                    }
                })
            }

            if ( ww.isVisible(box, 200) ) {
                display()
            } else {
                ww.scrollbar.on('jsp-scroll-y', ww.throttle(function(event, scrollPositionY, isAtTop, isAtBottom){
                    if ( ww.isVisible(box, 200) ) display();
                }, 60))
            }
        })();

        // 【游戏名】(位于可视区域才加载)
        (function(){
            var cache = []
            var once = false
            var box = $('#gameSpecial')

            function display (){
                if (once) {
                    return 
                }

                once = true;

                onViewportChange(function(type){   
                    if (type === 0) {         
                        if (cache[0]) {
                            _this.gameSpecial(cache[0], 0);
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.GameSpecial, {isWideScreen: 0}, function(d){
                                if(+d.status==1000){
                                    _this.gameSpecial(cache[0] = d.result, 0);
                                }
                            })
                        }
                    }
                    else if (type === 1){
                        if (cache[1]) {
                            _this.gameSpecial(cache[1], 1);
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.GameSpecial, {isWideScreen: 1}, function(d){
                                _this.gameSpecial(cache[1] = d.result, 1);
                            })
                        }
                    }
                    else {
                        if (cache[2]) {
                            _this.gameSpecial(cache[2], 2);
                        }
                        else {                        
                            Helper.getRemoteJsonData(Helper.Urls.GameSpecial, {isWideScreen: 2}, function(d){
                                _this.gameSpecial(cache[2] = d.result, 2);
                            })
                        }
                    }
                })
            }

            if ( ww.isVisible(box, 200) ) {
                display()
            } else {
                ww.scrollbar.on('jsp-scroll-y', ww.throttle(function(event, scrollPositionY, isAtTop, isAtBottom){
                    if ( ww.isVisible(box, 200) ) display();
                }, 60))
            }
        })();

        //顶部游戏列表
        Helper.getRemoteJsonData(Helper.Urls.GameList,null,function(d){
            if(+d.status==1000){
                _this.otherGame(d.result.normal);
            }
        });

        //加载更多
        _this.getMoreLive();
    },
    createHtml: function (type, data, id, fn, isReplace) {
        var html = Template[type](data);
        $('#' + id)[isReplace ? 'html' : 'append'](html);
        $.isFunction(fn) && fn();
    },
    //活动轮播专区
    activeLive: function (data) {
        var _this=this;
        _this.createHtml('ActiveLive',{list:data},'scroll-ad', function () {
            new DWSlider({el: $('#scroll-ad'), time:4000,width:650,height:328});
            if(data.length==1){$(".navBar").hide();}
        });
    },
    //财富新贵
    newWealth:function(data){
        var _this=this;
        _this.createHtml('NewWealth',{list:data},'newWealth');
    },

    //游戏列表
    hotLive:function(data, id, type, fn, isReplace){
        var _this = this;
        _this.createHtml('HotLive', {list:data,type:type}, id, fn, isReplace);
    },

    //游戏列表-其他游戏
    otherGame:function(data){
        var _this = this;
        var elm = $('#otherGame')
        var open = false
        var timeout = null

        _this.createHtml('OtherGame',{list:data},'otherGame', function(){
            var h = elm.height()

            timeout = setTimeout(toggle, 1000)

            function toggle () {
                if (h <= 18) {
                    return 
                }

                timeout !== null && clearTimeout(timeout)

                elm.animate({marginTop: open ? 0 : -18}, 1000, function(){
                    open = !open
                    timeout = setTimeout(toggle, 3000)
                }) 
            }

            elm.on('mouseenter', function(){
                timeout !== null && clearTimeout(timeout)
            })
            .on('mouseleave', function(){
                timeout = setTimeout(toggle, 1000)
            })
        });
    },

    //游戏专区
    gameSpecial:function(result, screenType){
        var _this = this;
        var minLen = [3, 4, 5][screenType];

        $("#gameSpecial").html('');

        for(var i=0, len=result.length; i<len; i++){
            var item = result[i];
                
            if(item.data && item.data.length>=minLen){
                //增加游戏主播展示
                var _anchor = getAnchorList(item.hotProfiles);

                $("#gameSpecial").append(
                '<div class="m-box">'+
                    '<div class="m-box-hd">'+
                        '<a class="m-tit" eid='+item.data[0].gameHostName+'" eid_desc="'+item.data[0].gameFullName+'" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid='+ item.gid+'&gName='+ item.gameFullName+'">'+
                            '<h3>'+ item.gameFullName+'</h3>'+
                        '</a>'+
                        _anchor+
                        '<a class="hd-more clickstat" eid="'+item.data[0].gameHostName+'" eid_desc="'+item.data[0].gameFullName+'" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid='+ item.gid+'&gName='+ item.gameFullName+'">查看全部<i>&gt;</i></a>'+
                    '</div>'+
                    '<div class="m-box-bd">'+
                        '<div class="list-liveMod">'+
                            '<ul id="gameSpecial'+i+'"></ul>'+
                        '</div>'+
                    '</div>'+
                '</div>'
                );

                _this.createHtml(
                    'HotLive',
                    {list: item.data, type:"gameSpecial", screenType: screenType}, 
                    'gameSpecial'+i,
                    function () {
                        ww.scrollbar.api.reInit()
                        $('#gameSpecial'+i).find('.J_liveMod').createLiveCard()
                    }
                );
            }
        }

        function getAnchorList(d) {
            var ret = '', len;

            if(d && (len = d.length)) {
                ret = '<span class="anchor-list">';

                for(var i = 0; i < len; i++) {
                    var item = d[i],
                        cls = +item.isOnLive === 0 ? 'grey' : '',
                        last = (i == len -1) ? ' last' : '',
                        href = +item.isOnLive ? 'href="javascript:;" onclick="ww.open('+item.channel+','+item.liveChannel+')"' : '';
                    
                    ret += '<a '+href+' class="'+cls+last+'">'+d[i].nick+'</a>';
                }

                ret += '</span>';
            }

            return ret;
        }
    },

    //首页更多直播
    getMoreLive: function (argument) {
        var _this = this;
        var isPending = false;
        var pageNum = 1;

        var getDataIfAtBottom = function(event, scrollPositionY, isAtTop, isAtBottom){
           if(pageNum > 3 || ww.scrollbar.api.getPercentScrolledY() < 0.85 || isPending){
                return
            }

            isPending = true;

            Helper.getRemoteJsonData(Helper.Urls.moreLive,{page: pageNum, size: 20},function(d){
                isPending = false;

                if(+d.status==1000){
                    var data = d.result.data;
                    if(data.length > 0){
                        
                        _this.createHtml(
                            'HotLive',
                            {list:data,type:"moreLive"},
                            'moreLiveList',
                            function () {
                                ww.scrollbar.api.reInit()
                                $('#moreLiveList').find('.J_liveMod').createLiveCard()
                            }
                        );
                    
                        pageNum++;

                        pageNum > 3 && $("#loadMoreLive").hide();
                    }else{
                        $("#loadMoreLive").html("没有更多数据了");
                    }
                }else{
                    $("#loadMoreLive").html("没有更多数据了");
                }  
            });
        }

        var timeout = null;

        ww.scrollbar.bind('jsp-scroll-y', function(){
            timeout !== null && clearTimeout(timeout);

            var self = this
            var args = arguments

            timeout = setTimeout(function(){
                getDataIfAtBottom.apply(self, args)
            }, 60)
        });
    }
});

// 统计上报
report({
    rso: "from_jcsj", 
    rso_desc: "精彩世界",
    eid: "pageview/jcsj",  
    eid_desc:"pageview/精彩世界"  
});

module.exports = Index;