<%
    var cfg; 

    if ( !$.isPlainObject(cfg) ) {
        cfg = {}
    }

    var totalCount = parseInt(data.totalCount, 10);
%>
<div class="liveMod J_liveMod" data-channel="<%=data.channel%>" data-livechannel="<%=data.liveChannel%>" data-type="<%=(data.liveSourceType == 2 ? data.privateHost : '')%>">

    <% if (cfg.showTag) {%>
        <% if(data.recommendTag == 16) {%>
            <span class="liveMod-tag liveMod-tag-0"></span>
        <% } else if (data.recommendTagName) { %>
            <span class="liveMod-tag liveMod-tag-1" style="background: #<%=data.recommendTagColor%>;"><%-data.recommendTagName%></span>
        <% } %>
    <% } %>

    <a class="liveMod-pic J_enterLive" href="#">
        <% if(data.screenType == 1) {%>
            <img class="J_screenshot" src="<%=(data.screenshot+'').indexOf('?imageview') != -1 ? data.screenshot : (data.screenshot+'?imageview/4/0/w/130/h/230/rotate/270')%>">
        <% } else { %>
            <img class="J_screenshot" src="<%=(data.screenshot+'').indexOf('?imageview') != -1 ? data.screenshot : (data.screenshot+'?imageview/4/0/w/230/h/130/blur/1')%>">
        <% } %>
        <span class="m-mask"><i></i></span>
    </a>
    <div class="liveMod-contWrap">
        <div class="liveMod-cont">
            <a class="liveMod-nick J_enterLive" href="#"><%-data.nick%></a>
            <a class="liveMod-desc J_enterLive" href="#"><%=data.introduction%></a>
            <div class="liveMod-note">
                <p class="liveMod-count"><i></i><em><%=ww.format(totalCount)%></em></p>
            <% if (cfg.showGame !== false) {%>
            <a class="liveMod-gName" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=<%=data.gid%>&gName=<%-data.gameFullName%>"><%-data.gameFullName%></a>
            <% } %>
            </div>
        </div>
    </div>
</div>