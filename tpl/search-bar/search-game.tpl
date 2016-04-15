<!-- 搜索页：游戏数据 -->

    <% 
    for(i = 0; i < list.length; i++) { 
        var item = list[i]; 
    %>
    <div class="game-item clickstat">
        <a href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=<%=item.game_id%>&gName=<%-item.game_name%>" title="<%-item.game_name%>">
            <div class="g-avatar">
                <img src="<%=item.img_url%>" alt="<%-item.game_name%>" onerror="this.onerror='';this.src='http://assets.dwstatic.com/amkit/p/duya/common/img/default_game_pc.jpg'">
            </div>
            <div class="g-info">
                <table>
                    <tr>
                        <td>
                            <span><%=huya_skwHandler(skw, item.game_name)%></span>
                            <p>直播中: <%=item.profileNum%></p>
                            <p>观众: <%=item.user_count%></p>
                        </td>
                    </tr>
                </table>
            </div>
        </a>
    </div>
    <%}%>
