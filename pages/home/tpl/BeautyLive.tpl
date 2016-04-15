<!-- 美女模板 -->

<%var data, screenType;%>
<%var limitLen = screenType > 1 ? 6 : 5;%>

<%for(var i=0, len=list.length; i<Math.min(len, limitLen); i++){%>
<%
    data=list[i];
%>
    <li class="clickstat" data-channel="<%=data.channel%>" data-livechannel="<%=data.liveChannel%>" eid="click/jingcaishijie/meinv<%=(i+1)%>" eid_desc="点击/精彩世界/美女<%=(i+1)%>">
        <a class="pic J_enterLive" href="#">
            <img src="<%=data.avatar%>" />
            <span class="m-mask"><i></i></span>
        </a>
        <div class="infoWrap">
            <div class="info">
                <a class="nick J_enterLive" href="#" title="<%-data.nick%>"><%-data.nick%></a>
                <a class="desc J_enterLive" href="#"><%=data.introduction%></a>
                <div class="note">
                    <span class="count"><i class="viewer-icon"></i><b><%=data.totalCount%></b></span>
                    <a class="gName" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=<%=data.gid%>&gName=<%-data.gameFullName%>"><%-data.gameFullName%></a>
                </div>
            </div>
        </div>
    </li>
<%}%>