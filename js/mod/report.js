// 珠海统计
function zhReport(obj) {
    var source = $.extend({
        pro : "huya_pcweb",//产品给的
        pas : YA.cookie.get('username') || '',
        yyuid: YA.cookie.get('yyuid'),
        pageType : "root",
        rso : "",
        rso_desc : "",
        eid : "",
        eid_desc : ""
    }, obj)

    var ya = window.ya = new YA(source.pro,source.pas,{
       pageType: source.pageType,
       yyuid : source.yyuid
    });

    ya.reportProductStartUp({
        pro: source.pro,
        rso: source.rso,
        rso_desc: source.rso_desc
    });

    ya.startProductHeartbeat();

    ya.reportProductEvent({
        eid: source.eid,
        eid_desc: source.eid_desc
    })

    $("body").on('click', '.clickstat',function(event){
        ya.reportProductEvent({
            eid:$(this).attr('eid'),  //产品给的
            eid_desc:$(this).attr('eid_desc')  //产品给的
        });

        //统计该点击所属模块的总点击
        var _parent = $(this).closest('.clickStatParent');
        if(_parent.length) {
            ya.reportProductEvent({
                eid:_parent.attr('eid'),  //产品给的
                eid_desc:_parent.attr('eid_desc')  //产品给的
            });
        }
    });
}



var defer = $.Deferred();

ww.loadJs({
    url: 'http://szhuodong.duowan.com/s/rp/ya-huya.min.js',
    beforeSend: function (script) {
        script.id = 'yaScript'
        script.setAttribute('pro', 'huya_pcweb')
    },
    success: function () {
        ww.getUid(function(uid){
            defer.resolve(uid)
        })
    }
})

module.exports = function(opt) {
    defer.done(function(uid){
        zhReport(
            $.extend({
                yyuid: uid
            }, opt)
        )
    })
};


// 海度统计
ww.loadJs('http://assets.dwstatic.com/project/yytv/world/2.1.0/js/hiido_stat.js', function(){
    ww.getUid(function (uid){
        $(document.body).on('click', '.hiido_stat', function(){
            var params={
                "act":"webevent",
                "eventid":$(this).attr("hiido_code"),//EVENTID
                "value":1,//VALUE
                "eventype":1,//EVENTTYPE
                "uid":uid,//UID
                "username":uid//UID
            };

            try {
                appHiido.stat(params)
            }catch (e) {}
        });
    });    
});

// 百度统计
var _hmt = _hmt || [];
ww.loadJs('//hm.baidu.com/hm.js?120405c13c515e9ff04f83f91af0f4b1');
