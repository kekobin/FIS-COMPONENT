<!-- 推荐位 -->

<%var data;%>
<%for(var i=0,len=list.length;i<len;i++){%>
<%
data=list[i];
%>
    <li data-original="<%=data.picUrl%>" eid="click/jingcaishijie/tuijianwei" eid_desc="点击/精彩世界/推荐位" class="clickstat" ><a <%=data.isLive==0?'href="'+data.linkUrl+'" target="_blank"':' href="javascript:;" onclick="ww.open('+data.channel+','+data.liveChannel+')"'%><%=data.isLive==0?'':''%>></a></li>
<%}%>