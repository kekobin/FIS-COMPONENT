<!-- 历史搜索记录模板  -->
<% for( var i = 0, len = list.length; i < len; i++) {%>
	<li data-kw="<%-list[i]%>" class="clickstat">
		<i class="time-icon"></i>
		<span class="history-keyword"><%-list[i]%></span>
		<span class="close-icon" data-kw="<%-list[i]%>">&times;</span>
	</li>
<% } %>

<%	if(list.length > 0) { %>
	<li class="remove-all-history">
		<span>清空全部</span>
	</li>
<% } %>
