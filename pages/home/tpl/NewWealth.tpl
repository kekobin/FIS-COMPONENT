<!-- 财富新贵模板 -->
<%var data;%>
<%for(var i=0,len=list.length;i<len&&i<10;i++){%>
<%
data=list[i];
%>
    <li class="clickstat" eid="click/jingcaishijie/caifuxingui" onclick="ww.open(<%=data.channel%>,<%=data.liveChannel%>)" eid_desc="点击/精彩世界/财富新贵">
        <span class="order no-<%=(i < 3 ? i + 1 : 'n')%>"><%=(i+1)%><i></i></span>
        <a class="pic" href="javascript:;" onclick="ww.open(<%=data.channel%>,<%=data.liveChannel%>)"><img src="<%=data.avatar%>" onerror="this.onerror='';this.src='http://assets.dwstatic.com/amkit/p/duya/common/img/default_profile.jpg'"/></a>
        <div class="info">
            <h5 class="ellipsis"><a href="javascript:;" onclick="ww.open(<%=data.channel%>,<%=data.liveChannel%>)"><%-data.nick%></a></h5>
            <p><a href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=<%=data.gid%>&gName=<%-data.gameFullName%>"><%-data.gameFullName%></a></p>
            <p>新增财富值 <%=data.income%></p>
        </div>
    </li>
<%}%>