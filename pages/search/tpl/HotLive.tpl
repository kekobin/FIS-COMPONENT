<!-- 推荐直播(recommendLive)、热门直播(hotLive)、更多直播9moreLive)、某个游戏直播模板(gameSpecial) -->

<%var data;%>
<% 
    var eid, eid_desc, hasSuffix, screenType; 

    switch(type){
        case 'recommendLive': eid = "click/jingcaishijie/tuijianzhibo/tuijianzhibo", eid_desc="点击/精彩世界/全部直播/推荐直播"; hasSuffix = true; break;
        case 'hotLive': eid = "click/jingcaishijie/remenzhibo/remenzhibo"; eid_desc = "点击/精彩世界/热门直播/热门直播"; hasSuffix = true;  break;
        case "moreLive": eid = "click/jingcaishijie/morelive"; eid_desc = "点击/精彩世界/更多直播"; hasSuffix = false;  break;
        case "gameSpecial": eid = "click/jingcaishijie/"+list[0].gameHostName; eid_desc = "点击/精彩世界/"+list[0].gameFullName; hasSuffix = false; break;
    }

    var limitLen;

%>
<%
    if(type === "recommendLive"){
        limitLen = screenType > 1 ? 12 : 9
    }
    else if(type == 'gameSpecial'){
        limitLen = [3, 4, 5][screenType]
    }    
    else{
        limitLen = list.length;
    }

    for(var i=0,len=list.length; i<Math.min(len, limitLen); i++){
        data=list[i];

        if(hasSuffix){
            var index = parseInt(i)+1;
            current_eid_desc = eid_desc + index;
            current_eid = eid + index;
        }else{
            current_eid = eid;
            current_eid_desc = eid_desc;
        }
%>
    <li class="clickstat" eid="<%=current_eid%>" eid_desc="<%=current_eid_desc%>">
        <% (function(data, cfg){  %>
            <link rel="import" href="/tpl/liveCard.tpl?__inline">
        <% })(data, {showTag: true}); %>
    </li>
<%}%>