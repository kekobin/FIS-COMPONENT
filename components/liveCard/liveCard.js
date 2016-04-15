$.fn.createLiveCard = function () {

    this.each(function(){
        var mod = $(this)

        mod.on('mouseenter', function(e){
            $(this).addClass('active')
        })
        .on('mouseleave', function(e){
            $(this).removeClass('active')
        })

        // 直播截图
        mod.find('.J_screenshot').one('error', function(e){
            this.src = 'http://assets.dwstatic.com/amkit/p/duya/common/img/default_live.jpg'
        })
    })

    return this
};

// 直播卡片
$(function(){
    $('body').on('click', '.J_enterLive', function(e) {
        e.preventDefault()

        var data = $(this).closest('.J_liveMod').data()
        // console.log(data)
        if (data) {
            tool.enterWonderWorld(data.channel, data.livechannel, data.type)
        }
    })
});


module.exports = {
    tpl: _.template( __inline('/tpl/liveCard.tpl') )
}