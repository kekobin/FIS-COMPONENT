<!-- 关键词相关的游戏 -->
<% for( var i = 0, len = list.length; i < len; i++) { 
	var data = list[i].game_name;
%>
	<li data-kw="<%-data%>" class="clickstat">           
	    <span class="history-keyword"><%-data%></span>
	</li>
<% } %>