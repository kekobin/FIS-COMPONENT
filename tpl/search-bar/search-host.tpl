<!-- 搜索页：主播数据 -->
<% 
var anchor = null;

for( var i = 0, len = list.length; i < len; i++ ) { 
	anchor = list[i];

	var channel = anchor.game_shortChannel ? anchor.game_shortChannel : anchor.game_longChannel;

	if(typeof channel === "undefined" || channel === 0) {
		channel = "未签约";
	}

	var levelPositionY = -19 * anchor.game_level + "px";
	var label = anchor.gameLiveOn ? ('<a target="_blank" class="label" href="'+ anchor.game_liveLink +'">直播中</a>') : '';
%>
	<li class="clickstat">
		<div class="anchor-pic J_anchorSub" data-aid="<%=anchor.aid%>">
			<a class="anchor-avatar" href="<%=anchor.game_profileLink%>" target="_blank" title="<%-anchor.game_nick%>">
	        	<img src="<%=anchor.game_avatarUrl180%>" onerror="this.onerror=null;this.src='http://assets.dwstatic.com/amkit/p/duya/common/img/default_profile.jpg'">
			</a>
        	<%=label%>
		</div>
		<div class="anchor-info">
		    <a class="nick" href="<%=anchor.game_profileLink%>" target="_blank" title="<%-anchor.game_nick%>">
		    	<i class="level" style="background-position: 0 <%=levelPositionY%>"></i><%=huya_skwHandler(skw, anchor.game_nick)%>
		    </a>
		    <p>订阅数：<%=anchor.game_activityCount%></p>
		    <p>频道：<%=channel%></p>
		</div>
	</li>
<% } %>