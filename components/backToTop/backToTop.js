// 返回顶部
$(function(){
    var btn = null
    
    ww.scrollbar.on('jsp-scroll-y', ww.throttle(function(e, scrollPositionY, isAtTop, isAtBottom){
        if(scrollPositionY > 200){
            if ( !btn ) {
                btn = $(
                    '<a class="ww-backToTop" href="#">'+
                        '<em>顶部</em>'+
                    '</a>'
                );

                btn.on("click",function(e){
                    e.preventDefault()
                    ww.scrollbar.api.scrollTo(0, 0)
                })
                .on("mouseenter",function(){
                    btn.find("em").css({
                        "right":0
                    });
                })
                .on("mouseleave",function(){
                    btn.find("em").css({
                        "right":-63
                    });
                });

                btn.appendTo(document.body);
            }

            btn.show();
        } else {
            btn && btn.hide();
        }
    }, 60));
});
