/**
 * slide  首页功能
 * @memberof / @constructor
 * @param {string}
 * @example
 **/
var DWSlider = function (conf) {
    this.init(conf);
};

$.extend(DWSlider.prototype, {
    timer: null,
    /**
     * 初始化
     * @memberof / @constructor
     * @param {string}
     * @example
     *
     **/
    init: function (conf) {
        this.setConfig(conf);
    },
    /**
     * 设置配置
     * @memberof / @constructor
     * @param {string}
     * @example
     *
     **/
    setConfig: function (conf) {
        var defArgs = {
            //绑定的元素
            el: null,
            //是否自动播放
            auto: true,
            //运行停留时间
            time: 3000,
            //切换时间
            animateTime: 300,
            //切换的宽度
            width:0,
            //切换的高度
            height:0,
            //数据源
            dataStore: null,
            //导航缩略图数据源
            navDataStore: null,
            //导航设置
            navBar: {left: 12, bottom: 6, width: 56, height: 37}
        };
        this.args = $.extend({}, defArgs, conf);
        var _this = this;
        if(_this.args.el.find('li').length==1){ _this.args.auto=false;}
        if (this.args.el) {
            this.wrap = this.args.el.parent();
            this.wrap.css({'position': 'relative', "overflow": "hidden"})
            this.setMainSize();
            this.createHtml();
            this.setRealImg(0);
            if (this.args.auto) {
                this.play();
            }
        } else {
            throw new Error('未指定绑定的元素');
        }
    },
    /**
     * 生成导航
     * @memberof / @constructor
     * @param {string}
     * @example
     **/
    createHtml: function () {
            var el = this.args.el;
            var str = ['<ul class="navBar pic_list_num">'];
            for (var i = 0, len = el.find('li').size(); i < len; i++) {
                str.push('<li class="clickStat' + (i == 0 ? ' on' : '') + '" style="display:block;"></li>');
            }
            str.push('</ul>');
            //str.push('<div class="pager"></div>')
            str=str.join('');
            this.wrap.append(str);
            var liEl=$('.pic_list_num li').eq(0);
            var left=(el.width()-(liEl.width()+parseFloat(liEl.css('margin-right'))||0)*i)/2;
            //$('.pic_list_num').css({'left':left,'z-index':2});
            $('.pic_list_num').css({'z-index':2});
            this.navEvent();
    },
    /**
     * 运行
     * @memberof / @constructor
     * @param {string}
     * @example
     *
     **/
    play: function (ind) {
        var _this = this, index = 1, maxLength = this.args.el.find('li').size();
        if (typeof ind != 'undefined') {
//            _this.args.el.animate({top:-(_this.args.height||_this.wrap.height()) * ind});
            _this.navChange(ind);
            index = ind+1;
        }
        this.timer = setInterval(function () {
            if (index >= maxLength) {
                index = 0;
            }
//          _this.args.el.animate({top:-(_this.args.height||_this.wrap.height()) * index});
            _this.navChange(index);
            _this.setRealImg(index);
            index+=1;
        }, this.args.time);

    },
    navChange: function (index) {
        this.args.el.find('li').hide().eq(index).fadeIn();
        this.wrap.find('.navBar li').removeClass('on').eq(index).addClass('on');
    },
    navEvent: function () {
        var _this = this;
        $('.navBar li', this.wrap).click(function (e) {
            var index= $(this).index();
            _this.stop();
            _this.play(index);
            _this.setRealImg(index);

        });
    },
    /**
     * 停止
     * @memberof / @constructor
     * @param {string}
     * @example
     *
     **/
    stop: function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    /**
     * 设置主显示区域
     * @memberof / @constructor
     * @param {string}
     * @example
     **/
    setMainSize: function () {
        var el = this.args.el;
        el.width(el.parent().width());
        var elWidth = el.width(), elHeight = this.wrap.height(), size = el.find('li').size(),paddingH=(parseFloat(el.css('padding-top'))+parseFloat(el.css('padding-bottom'))||0,paddingW=(parseFloat(el.css('padding-left'))+parseFloat(el.css('padding-right'))))||0;
        el.find('li').css({'float': 'left','width':elWidth-paddingW,'height':elHeight-paddingH});
        el.css({'left': 0, height: elHeight});
    },
    /**
     * 生成真实图片
     * @memberof / @constructor
     * @param {string}
     * @example
     **/
    setRealImg: function (index) {
        var _this = this;
        var $imgWrap=this.args.el.find('li').eq(index);
        if($imgWrap.size()<1)return;
        if($imgWrap.attr('is_loaded')){
            return;
        }
        var url=$imgWrap.attr('data-original');
        if(url){$imgWrap.append('<img width="'+$imgWrap.width()+'" height="'+$imgWrap.height()+'" src="'+url+'"/>')}
        $imgWrap.attr('is_loaded',1);
    }
});