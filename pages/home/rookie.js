var Helper = require('/js/mod/helper');

var Template = {
    Rookie:__inline('./tpl/Rookie.tpl')
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

// 虎牙新秀
function rookie () {
    var getYoungTop = Helper.getRemoteJsonData(Helper.Urls.YoungTop)
    var getYoung = Helper.getRemoteJsonData(Helper.Urls.Young)

    var a_list = []
    var b_list = []

    var showTop = false

    $.when(getYoungTop, getYoung)
     .done(function(a, b){
        var a_res = a[0]
        var b_res = b[0]

        if (a_res.status == 1000) {
            if (a_res.result && a_res.result.data && a_res.result.data.length) {
                a_list = a_res.result.data
                showTop = a_list.length >= 2
            }
        } else {
            log('获取虎牙新秀顶置数据失败：' + a_res.status + ', ' + a_res.message)
        }

        if (b_res.status == 1000) {
            if (b_res.result && b_res.result.data && b_res.result.data.length) {
                b_list = b_res.result.data
            }
        } else {
            log('获取虎牙新秀数据失败：' + b_res.status + ', ' + b_res.message)
        }
    })

    // 最新主播
    .done(function(){
        if (!showTop) return;

        var container = $('#J_rlpl').show()
        var stage = container.find('.stage')
        var count = 0
        var html = ''

        // 业务逻辑
        if (a_list.length%2 === 1) {
            a_list.splice(a_list.length-2, 0, a_list[a_list.length-2])
        }

        while (a_list.length >= 2) {
            html += createPane( a_list.splice(0, 2) )
        }

        stage.html(html)

        // 轮播
        $('#J_rlpl').slide({
            effect: "fade",
            autoPlay: true,
            interTime: 3000,
            prevCell: '.prev',
            nextCell: '.next',
            mainCell: stage
        });

        // 进入直播间
        stage.on('click', '.J_rookie', function(e){
            e.preventDefault()

            var data = $(this).data()
            ww.open(data.channel, data.livechannel)
        });

        function createPane (list) {
            if (!list.length) return '';

            count++

            var s = '<ul>';

            $.each(list, function(i, item){
                i++
                s += '<li class="clickstat" data-isrec="'+ !!item.isRec +'" data-uid="'+ item.uid +'" data-eid="click/jingcaishijie/rookie/zhubo/'+ (count +'-'+ i) +'" data-eiddesc="点击/精彩世界/虎牙新秀/主播/'+(count +'-'+ i)+'">'+ Template.Rookie(item) +'</li>'
            });
            
            s += '</ul>';

            return s
        }
    })
    
    // 最新直播
    .done(function(){
        if (b_list.length <= 0) return;

        var rltl = $('#J_rltl').show();
        var listCont = rltl.find('.cont');

        !showTop && listCont.addClass('much');

        // 切换
        (function(){
            var index;
            var max = showTop ? 10 : 15
            var count = Math.floor(b_list.length/max) 

            function go (i) {
                if (i === index) return;
                
                index = i
                var list = b_list.slice(index*max, (index+1)*max)

                var html = ''

                if (!html) {
                    var smh, timeString;

                    $.each(list, function(i, o){

                        function timeParse(sec) {
                            var arr = []

                            do {
                                arr.push(sec%60)
                                sec = Math.floor(sec/60)
                            } while (sec > 0)

                            return arr
                        }

                        smh = timeParse(o.hasLiveTime);

                        timeString = (smh[2] ? smh[2] + '小时' : '') + (smh[1] ? smh[1] + '分钟' : '');
                        
                        html += '' +
                            '<a class="clickstat" href="#'+ o.channel +','+ o.liveChannel +'"' +
                            ' data-channel="'+ o.channel +','+ o.liveChannel +'"' +
                            ' title="【'+ o.gameFullName +'】'+ o.introduction +'\r\n主播：'+ xss(o.nick) +'\r\n开播：'+ timeString +'"' +
                            ' data-eid="click/jingcaishijie/rookie/zhibo/'+ (index*max+i+1) +'"'+
                            ' data-eiddesc="点击/精彩世界/虎牙新秀/直播/'+ (index*max+i+1) +'"'+
                            ' data-uid="'+ o.uid +'"'+
                            ' data-isrec="'+ !!o.isRec +'"'+
                            '>'+
                                '【'+ o.gameFullName +'】'+ o.introduction +
                            '</a>'
                    })
                } 

                function xss(msg) {
                    if (typeof msg !== 'string') return msg;

                    msg = msg.replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/\'/g, '&#39;')
                            .replace(/\"/g, '&quot;');

                    return msg;        
                }

                listCont.html(html)
            }

            go(0)

            rltl.find('.switch').on('click', function(e){
                e.preventDefault()
                var i = index + 1

                if (i >= count) {
                    i = 0;

                    // 将数组随机排序
                    (function(array) {
                        var counter = array.length, temp, index;

                        while (counter > 0) {
                            index = Math.floor(Math.random() * counter);

                            counter--;

                            temp = array[counter];
                            array[counter] = array[index];
                            array[index] = temp;
                        }

                        return array;
                    })(b_list)
                }

                go(i)
            });
        })();

        // 跳动效果
        (function(){
            var sign = rltl.find('.sign')
            var timeout = null
            var index = 0
            var h;

            listCont.on('mouseover', 'a', function(e){
                var item = $(this);
                var i = item.index();

                !h && ( h = item.outerHeight(true) )
                go(i)
            });

            function go (i) {
                timeout !== null && clearTimeout(timeout);

                if (i === index) return;

                timeout = setTimeout(function(){
                    index = i
                    sign.animate({top: i*h}, 200, 'easeOutBounce')    // 依赖 jquery.easing.js 插件
                }, 80)
            }
        })();

        // 进入直播间
        listCont.on('click', 'a', function(e){
            // e.preventDefault()
            var channel = $(this).data('channel')

            if (channel) {
                channel = channel.split(',')
                ww.open(channel[0], channel[1])
            }
        });
    })

    .done(function(){
        // 统计上报
        $('#J_rlpl .stage, #J_rltl .cont').on('click', '.clickstat', function(e){
            // e.preventDefault()
            var data = $(this).data()

            try {
                ya.reportProductEvent({
                    isrec: data.isrec,
                    uid: data.uid,
                    eid: data.eid, 
                    eid_desc: data.eiddesc 
                })
            } catch (e) {}
        })
    })
}

module.exports = rookie;