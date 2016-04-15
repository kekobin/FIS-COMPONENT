<!-- 顶部右侧游戏导航模板 -->
<%var data;%>
<%for(var i=0,len=list.length;i<len-10;i++){%>
<%
data=list[i];

if(data.gid == 2060 || data.gid == 10 || data.gid == 1504) {
    continue;
}

%>
    <a eid="click/jingcaishijie/daohang/<%-data.gameHostName%>" eid_desc="点击/精彩世界/导航<%-data.gameFullName%>" class="clickstat<%= data.useColor == 1? ' cred' : '' %>" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=<%=data.gid%>&gName=<%-data.gameFullName%>"><%-data.gameFullName%></a><span>|</span>
<%}%>