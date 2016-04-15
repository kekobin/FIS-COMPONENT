<!-- 今日热搜模板 -->

<% for(var i = 0, len = list.length; i < len; i++) { 
	var activeClass = "";
	if(i < 3){
		activeClass = "active";
	}
%>
	<li data-kw="<%-list[i]%>" class="clickstat">
	    <i class="<%=activeClass%> order-icon"><%=(i+1)%></i>
	    <span class="history-keyword hot"><%-list[i]%></span>
	</li>
<% } %>