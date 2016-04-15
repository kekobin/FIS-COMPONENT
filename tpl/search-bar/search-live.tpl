<!-- 搜索页：直播数据 -->
<% for( var i = 0, len = list.length; i < len; i++) { 
	var data = list[i];
	var _data = {
		channel: data.game_channel,
		liveChannel: data.game_subChannel,
		recommendTag: data.game_recommendStatus,
//		recommendTagName: 
//		recommendTagColor: 
		screenshot: data.game_screenshot,
		avatar: data.game_imgUrl,
		nick: data.game_nick,
		introduction: data.game_introduction,
		gid: data.gameId,
		gameFullName: data.gameName,
		totalCount: data.game_total_count,
		screenType: data.screen_type
	};
%>
	<li class="clickstat">
        <% (function(data){  %>
            <link rel="import" href="/tpl/liveCard.tpl?__inline">
        <% })(_data); %>
	</li>
<% } %>