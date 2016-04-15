var test = ww.type === 1 ? 'test.' : '';

var Helper={
    //获取数据json格式
    getRemoteJsonData:function(/*string*/ url, /*object*/ dataObj, /*function*/fn, /*boolean*/ isCache){
       function getUrlParam(url,argname){
            var arrStr = url.substring(url.indexOf("?")+1).split("&");
            for(var i =0;i<arrStr.length;i++)
            {
                var loc = arrStr[i].indexOf(argname+"=");
                if(loc!=-1)
                {
                    return arrStr[i].replace(argname+"=","").replace("?","");
                    break;
                }
                
            }
            return "";
        }

        var callbackName = 'callback_' + getUrlParam(url,'do'); 

        if(callbackName in window) {
          callbackName += 'c';
        }

        window[callbackName] = fn;

        return $.ajax({
            url:url,
            dataType:'jsonp',
            data: dataObj || '',
            cache: (isCache != undefined ? isCache : true),
            jsonpCallback: callbackName
        });
    },

    Urls:{
        // 虎牙新秀
        Young: "http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=young",

        // 虎牙新秀top
        YoungTop: "http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=youngTop",

        //推荐直播接口
        RecommLive:"http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=recommend",

        BeautyLive:"http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=beauty",

        //游戏专区
        GameSpecial:"http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=gamezone",

        //游戏列表
        GameList:"http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=gamelist",
        
        //活动专区
        ActiveLive:"http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=activity",

        //首页更多直播
        moreLive:"http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=more",

        //财富新贵
        ProfileWealthRank: "http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=profilewealthrank",

        //热门直播
        CustomArea: "http://"+ test +"iframe.huya.com/wonderful/nosession.php?m=HomeV2&do=customarea"
    }
};

module.exports = Helper;