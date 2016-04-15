__inline('./global/json2.js');
__inline('./global/jquery.js');
__inline('./global/jquery.easing.1.3.js');
__inline('./global/jquery.mousewheel.js');
__inline('./global/jquery.jscrollpane.min.js');
__inline('./global/underscore.js');
__inline('./global/storage.js');
__inline('./global/mod.js');

/**
 * 精彩世界全局对象: ww (Wonderful World)
 */
(function(global){
    var ww = global.ww = {
        type: (function(){
            var domain = document.domain

            if (domain === 'iframe.huya.com') {
                return 0
            } else if (domain === 'test.iframe.huya.com') {
                return 1
            } else {
                return 2
            }
        })(),
        debug: true,
        log: function () {
            if (!this.debug) return;
            try {return console.log.apply(console, arguments)} catch (e) {}
        },
        open: function(sid, subsid, privateHost){
            if (privateHost) {
                return window.open('http://www.huya.com/'+ privateHost +'?from=jcsj')
            }
            
            try {
                var params = '{'+
                    '"bufCode": "226",'+
                    '"businessType": "1",'+
                    '"actType": "ZDY",'+
                    '"reportBuf": {'+
                        '"sid": {'+
                            '"type": "uint32",'+
                            '"value": "'+ sid +'"'+
                        '},'+
                        '"subSid": {'+
                            '"type": "uint32",'+
                            '"value": "'+ subsid +'"'+
                        '},'+
                        '"sidType": {'+
                            '"type": "uint32",'+
                            '"value": "67108867"'+
                        '},'+
                        '"bak1": {'+
                            '"type": "string",'+
                            '"value": "游戏直播"'+
                        '},'+
                        '"bak2": {'+
                            '"type": "string",'+
                            '"value": ""'+
                        '},'+
                        '"bak3": {'+
                            '"type": "string",'+
                            '"value": ""'+
                        '},'+
                        '"bak4": {'+
                            '"type": "string",'+
                            '"value": ""'+
                        '},'+
                        '"bak5": {'+
                            '"type": "string",'+
                            '"value": ""'+
                        '}'+
                    '}'+
                '}';

                // 接口文档：http://uedfe.yypm.com/md/page?id=精彩世界数据上报接口文档
                window.external.sendCommand('httpRealTimeReport', params);
            } catch (e) {}

            try {
                var id = '{"channelId":"'+sid+'","subId":"'+subsid+'"}';
                window.external.sendCommand("joinTemplateWithData", id);
            } catch (e) {}

            return false
        },
        dequery: function (url) {
            var param = {},
                search = typeof url === 'string' ? url : location.search;

            var index = search.indexOf('?');

            if (index != -1) {
                search = search.substr(index + 1)
            }

            if(search){
                search = search.split('&');

                for(var i = 0, len = search.length; i < len; i++){
                    var arr = search[i].split('=');
                    param[ decodeURIComponent(arr[0]) ] = decodeURIComponent(arr[1] || '');
                }
            }

            return param;
        },
        DJBHash: function (skey) {
            if (!skey)  return;

            var skey = skey+'',    // toString 
                hash = 5381, 
                _token;

            if (skey) {
                for (var i = 0, l = skey.length; i < l; ++i) {
                    hash += (hash << 5) + skey.charAt(i).charCodeAt();
                }
                
                _token = hash & 2147483647;
            }

            return _token;
        },
        importStyle: function (cssText, id) {
            if (document.getElementById(id)) return;

            var element = document.createElement('style');

            id && (element.id = id);

            // Adds to DOM first to avoid the css hack invalid
            document.getElementsByTagName('head')[0].appendChild(element);

            // IE
            if (element.styleSheet) {

                // http://support.microsoft.com/kb/262161
                if (document.getElementsByTagName('style').length > 31) {
                    throw new Error('Exceed the maximal count of style tags in IE')
                }

                element.styleSheet.cssText += cssText
            }
            // W3C
            else {
                element.appendChild(document.createTextNode(cssText))
            }
        },
        format: function (n) {
            if ( $.isNumeric(n) ) {
                return (n+'').replace(/(\d)(?=(\d{3})+$)/g,"$1,"); /*这个正则不适用于小数*/
            } else {
                return n
            }
        }
    };

    function debounce (fn, delay, immediate) {
        var timer = null

        var debounced = function () {
            if(timer) clearTimeout(timer);

            var context = this
            var args = arguments

            if (immediate) {
                if (!timer) fn.apply(context, args);

                timer = setTimeout(function(){
                    timer = null
                }, delay)
            } else {
                timer = setTimeout(function(){
                    timer = null
                    fn.apply(context, args)
                }, delay)
            }

            return context
        }

        debounced.cancel = function () {
            clearTimeout(timer)
            timer = null
        }

        return debounced
    }

    function throttle (fn, delay) {
        var firsTime = true
        var timer = null
        var args = null
        var context = null

        function throttled () {
            args = arguments
            context = this

            if (timer) {
                return
            }

            timer = setTimeout(function(){
                timer = null
                fn.apply(context, args)
                context = args = null
            }, firsTime ? 0 : delay)

            if (firsTime) firsTime = false;
        }

        throttled.cancel = function () {
            clearTimeout(timer)
            timer = context = args = null
        }

        return throttled
    }

    ww.debounce = debounce
    ww.throttle = throttle

    ww.loadJs = (function(){
        var cache = {}
        var doc;
        var head;

        return function (opt) {
            doc = doc || document;
            head = head || doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;

            var options = {
                url: '',
                destroy: false,
                beforeSend: function () {},
                success: function () {}
            }

            // compatible with loadJs('xxxxx', callback) syntax.
            if (typeof opt === 'string') {
                options.url = opt
                options.success = arguments[1]
            } else {
                $.extend(options, opt)
            }

            if ( cache[options.url] ) {
                return cache[options.url].done(options.success)
            } else {
                cache[options.url] = $.Deferred().done(options.success)
            }

            var script = document.createElement("script");

            if ('onload' in script) {
                script.onload = onload
            }
            else {
                script.onreadystatechange = function(){
                    if( /loaded|complete/.test(script.readyState) ){
                        onload()
                    }
                }
            }

            function onload () {
                script.onload = script.onreadystatechange = null

                if (options.destroy) {            
                    head.removeChild(script)
                    script = null
                }

                cache[options.url].resolve(script)
            }
            
            script.type = 'text/javascript';
            options.beforeSend(script);
            script.src = options.url;
            head.appendChild(script);

            return cache[options.url]
        }
    })();

    ww.getUid = (function(window, $){
        var getUidDefer = $.Deferred();

        window.getMyUidCallBack = function (uid) {
            getUidDefer.resolve(uid)
        };

        try {
            window.external.sendCommand("getMyUid")    // 获取成功之后 客户端会调用js的 getMyUidCallBack 函数
        } catch (e) {}

        return function (callback) {
            getUidDefer.done(callback) 
        }
    })(this, jQuery);

    // 给需要的url赋上uid
    ww.attachUid = function (a) {
        if (a && typeof a.href === 'string' && a.href.indexOf('&uid=]') !== -1) {

            ww.getUid(function(uid){
                a.href = a.href.replace('&uid=]', '&uid=' + uid +']')
            })

        }
        
        return a
    };

    $(function(){
        $('.J_attachUid').each(function(i, a){
            ww.attachUid(a)
        })
    });


    // 自定义滚动条
    $(function(){
        var scrollbar = $('#J_scrollbar')
        scrollbar.jScrollPane({mouseWheelSpeed:20, animateScroll: true});

        var api = scrollbar.api = scrollbar.data('jsp');

        // 由于 jScrollPane 滚动条 重置的时候消耗太大 这里做一下 调用频率限制
        api.reInit = debounce(function(cfg){
            // var st = new Date()
            api.reinitialise(cfg) // 这个操作实在是太昂贵了！
            // console.log( (new Date) - st )
        }, 120)

        $(window).resize(function(){
            api.reInit()
        });

        ww.scrollbar = scrollbar;

        ww.isVisible = function (elm, threshold) {
            if ( $(elm).offset().top <= ww.scrollbar.api.getContentPositionY() + $(window).height() + threshold) {
                return true
            } else {
                return false
            }
        }
    });

    // 宽屏 和 窄屏 切换事件
    $(function(){
        var win = $(window)
        var body = $(document.body)
        var cbs = $.Callbacks()
        var _type = getType()

        setView(_type)

        win.resize(debounce(function(e){
            var type = getType()

            if (_type !== type) {
                resize.type = _type = type
                setView(_type)
                cbs.fire(_type)
            }
        }, 30));

        function setView (type) {
            body.removeClass('screen-0 screen-1 screen-2') // TODO: 留给正则玩得溜的孩童优化
            body.addClass('screen-' + type)
        }

        function getType () {
            var w = win.width();
            return w < (950+40) ? 0 : (w < (1210+40) ? 1 : 2)
        }

        function resize (callback, call) {
            if (typeof callback === 'function') {
                call !== false && callback(_type);
                cbs.add(callback)
            }
        }

        resize.type = _type

        ww.resize = resize
    });

    $(function(){
        $(document.body).on('click', '.J_openInBrowser', function(e){
            e.preventDefault()
            this.href && window.open(this.href);
        })
    });
})(window);