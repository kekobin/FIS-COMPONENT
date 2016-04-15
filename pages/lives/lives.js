require('/components/backToTop');
var liveCard = require('/components/liveCard');
var itemListPo = require('/js/mod/itemListPo');
var report = require('/js/mod/report');

module.exports = itemListPo;


// 统计上报
report({
    rso: "from_jcsj", 
    rso_desc: "精彩世界",
    eid: "pageview/jcsj/zhiboall",  
    eid_desc:"pageview/精彩世界/全部直播"  
});

var liveFilter = {
    init: function(){
        var _this = this;
        _this.bindClickEvent();
        _this.getRecommendLiveData();
    },

    go: function (key, val, name) {
        var param = ww.dequery()

        if (typeof key === 'undefined' || typeof val === 'undefined' || param[key] === val) return;

        param[key] = val

        // 统计上报
        var ec = ''
        var ed = ''

        if (key === 'recommendTag') {
            ec = 'biaoqian'
            ed = '标签'
        } else if (key === 'gameBussType') {
            ec = 'fenlei'
            ed = '分类'
        } else if (key === 'gameId') {
            ec = 'youxi'
            ed = '游戏'
        }

        if (ec && ed) {
            try {
                ya.reportProductEvent({
                    eid: 'click/jcsj/alllive/shaixuan/'+ ec +'/' + val,
                    eid_desc: '点击/精彩世界/全部直播/筛选/' + ed + '/' + name
                });
            } catch(e) {}
        }
        
        // 给统计上报预留点时间
        setTimeout(function(){
            location.search = '?' + $.param(param)
        }, 200)
    },

    //绑定点击事件
    bindClickEvent: function(){
        var _this = this;
        var self = this

        // 相关标签
        $('#recommendTag').on('click', 'a', function(e){
            e.preventDefault()

            var a = $(this)
            var tag = a.data('recommendtag')

            self.go('recommendTag', tag, a.text())
        })

        // 相关分类
        $('#gameBussType').on('click', 'a', function(e){
            e.preventDefault()

            var a = $(this)
            var type = a.data('busstype')

            self.go('gameBussType', type, a.text())
        })

        // 热门游戏
        $('#gameId').on('click', 'a', function(e){
            e.preventDefault()

            var a = $(this)
            var id = a.data('gameid')

            self.go('gameId', id, a.text())
        })

        // 展开/收起筛选
        var param = ww.dequery()

        if( !('gid' in param) ){

            $('#headMore').on('click',function(){
                toggle(1)
            })

            $('#headClose').on('click',function(){
                toggle(0)
            })

            ww.resize(function(type){
                if (type > 0 || (param.recommendTag&&param.recommendTag!=-1) || (param.gameBussType&&param.gameBussType!=-1) || (param.gameId&&param.gameId!=-1)) {
                    toggle(1)
                } else {
                    toggle(0)
                }
            })

            function toggle (show) {
                if (show) {
                    $('#filterBtnContainer').show()
                    $('#headMore').hide()
                    $('#headClose').show()
                } else {
                    $('#filterBtnContainer').hide()
                    $('#headMore').show()
                    $('#headClose').hide()
                }
            }
        }
    },

    //获取推荐主播信息
    getRecommendLiveData: function(){
        if ( !$("#recommend_lives").length ) return;

        var _this = this;
        
        $.ajax({
            url: 'http://iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=recommend',
            dataType: 'jsonp',
            jsonpCallback: 'handlerRecommend',
            cache: true,
            success: function(d){
                var recommendLive = d.result.data
                var liHtml = []

                for(var i = 0, len = recommendLive.length; i < len; i++){
                    liHtml.push('<li>'+ liveCard.tpl({data: recommendLive[i]}) +'</li>')
                }

                $("#recommend_lives").html(liHtml.join(""));
            }
        })
    }
}

liveFilter.init();