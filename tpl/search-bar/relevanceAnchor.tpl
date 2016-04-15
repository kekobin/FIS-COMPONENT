<!-- 关键词相关主播 -->
<% for( var i = 0, len = list.length; i < len; i++) { 
	var data = list[i].game_nick;
	var userLogo = list[i];
%>
	<li data-kw="<%-data%>" class="clickstat">
		<img src="http://assets.dwstatic.com/amkit/p/duya/common/img/default_profile.jpg" width="50px" height="50px">           
	    <span class="history-keyword"><%-data%></span>
	</li>
<% } %>