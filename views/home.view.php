<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>虎牙直播</title>
    <link href="/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/css/global.scss" rel="stylesheet" type="text/css">
    <!--STYLE_PLACEHOLDER-->
</head>
<body>
<script>
/*
 * 为了提高页面显示的响应速度 所以将推荐位三屏的数据都进行同步渲染了
 * 下面的js是配合css做初始化时的显示处理的
 */
(function(){
    var w = document.documentElement.clientWidth
    var type = w < (950+40) ? 0 : (w < (1210+40) ? 1 : 2)
    var name = document.body.className

    document.body.className = (name ? name + ' ' : '') + ('screen-' + type)
})()
</script>

<div class="wrap-scroll" id="J_scrollbar">

    <div class="g-header">
        <div class="g-header-cont">
            <div class="hot-game clickStatParent" eid="click/jingcaishijie/daohangall1" eid_desc="点击/精彩世界/导航（左大图模块）总点击">
                <ul>
                    <li><a eid="click/jingcaishijie/daohang/lol" eid_desc="点击/精彩世界/导航英雄联盟" title="英雄联盟" class="clickstat" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=1&gName=英雄联盟"><img src="http://liveweb.bs2cdn.yy.com/wonderful_game_logo_55ee8b44422b3.jpg"><span>LOL</span></a></li>
                    <li><a eid="click/jingcaishijie/daohang/gta" eid_desc="点击/精彩世界/导航侠盗猎车手" title="侠盗猎车手5" class="clickstat" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=1964&gName=侠盗猎车手"><img src="./img/gta5.png"><span>主机游戏</span></a></li>
                    <li><a eid="click/jingcaishijie/daohang/cf" eid_desc="点击/精彩世界/导航穿越火线" title="穿越火线" class="clickstat" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=4&gName=穿越火线"><img src="http://liveweb.bs2cdn.yy.com/wonderful_game_logo_55ee8b614f238.png"><span>CF</span></a></li>
                    <li><a eid="click/jingcaishijie/daohang/dnf" eid_desc="点击/精彩世界/导航DNF" title="地下城与勇士" class="clickstat" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=2&gName=地下城与勇士"><img src="http://liveweb.bs2cdn.yy.com/wonderful_game_logo_55ee8bb57b85f.png"><span>DNF</span></a></li>
                </ul>
            </div>
            <div class="search-wrap">
                <div class="search-bar" id="search-bar">
                    <div class="search-input">
                        <input type="text" value="主播、频道、游戏">
                        <div class="search-btn clickstat" id="searchBtn" eid="click/jingcaishijie/sousuoanniu" eid_desc="点击/精彩世界/搜索按钮点击">
                            <i class="search-icon"></i>
                        </div>
                    </div>
                    <div class="search-list">
                        <div id="historySearchContainer" class="history">
                            <div class="search-title">历史搜索记录</div>
                            <ul class="search-history clickStatParent" id="historySearch" eid="click/jingcaishijie/lishijilu" eid_desc="点击/精彩世界/历史搜索记录点击"></ul>
                        </div>

                        <div class="relevance" id="relevanceGameContainer">
                            <div class="search-title">搜<span class="keyword"></span>的相关游戏</div>
                            <ul class="search-history clickStatParent" id="relevanceGame" eid="click/jingcaishijie/sousuoxialakuang" eid_desc="点击/精彩世界/搜索下拉框"></ul>
                        </div>

                        <div class="relevance" id="relevanceAnchorContainer">
                            <div class="search-title">搜<span class="keyword"></span>的相关的主播</div>
                            <ul class="search-history ahchor clickStatParent" id="relevanceAnchor" eid="click/jingcaishijie/sousuoxialakuang" eid_desc="点击/精彩世界/搜索下拉框"></ul>
                        </div>
                    
                        <div id="hotWordContainer" class="hot">
                            <div class="search-title today-hot">今日热搜</div>
                            <ul class="search-recommend clickStatParent" id="hotWord" eid="click/jingcaishijie/jinriresou" eid_desc="点击/精彩世界/今日热搜"></ul>
                        </div>
                    </div>
                </div><!-- /search-bar -->
                <div class="search-hots clickStatParent">
                    <div class="search-hots-line">
                        <p id="otherGame" eid="click/jingcaishijie/daohangall2" eid_desc="点击/精彩世界/导航游戏名总点击"></p>
                    </div>
                    <a class="search-hots-more game_href cred" eid="click/jingcaishijie/daohang/more" eid_desc="点击/精彩世界/导航/更多" href="yy://wonderworld-[tabPid=1002&tabSid=2005&uid=]">更多<i>&gt;&gt;</i></a>
                </div><!-- /search-hots -->
            </div><!-- /search-wrap -->
        </div>
    </div><!-- /g-header -->

    <div class="wrapper">
        <div class="gameFocus">
            <div class="gameFocus-main">
            <div class="gameFocus-cont">
                <div class="main-recomm">
                    <div class="m-box">
                        <div class="m-box-hd">
                            <a class="m-tit game_href" eid="click/jingcaishijie/tuijianzhibo/quanbu" eid_desc="点击/精彩世界/推荐直播/查看全部" href="yy://wonderworld-[tabPid=1002&tabSid=2006&uid=]">
                                <h3>推荐直播</h3>
                            </a>
                            <a class="hd-more game_href clickstat" eid="click/jingcaishijie/tuijianzhibo/quanbu" eid_desc="点击/精彩世界/推荐直播/查看全部" href="yy://wonderworld-[tabPid=1002&tabSid=2006&uid=]">查看全部<i>&gt;</i></a>
                        </div>
                        <div class="m-box-bd">
                        <?php foreach ($recommend as $i => $recommendList) { ?>
                            <div class="recomm-<?php echo $i;?>">
                                <div class="list-liveMod">
                                    <ul>
                                    <?php foreach ($recommendList as $ld) { ?>
                                        <li>
                                            <?php require 'common/liveCard.php'; ?>
                                        </li>
                                    <?php } ?>
                                    </ul>
                                </div>                                
                            </div>
                        <?php } ?>
                        </div>
                    </div>
                </div><!-- /main-recomm -->

                <div class="main-custom" id="customArea"></div>

                <div class="beauty-list" id="J_beauty">
                    <div class="m-box">
                        <div class="m-box-hd">
                            <a class="m-tit" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&do=bueaties"><h3>美女</h3></a>
                            <a class="hd-more clickstat" eid="click/jingcaishijie/meinv/quanbu" eid_desc="点击/精彩世界/美女全部文字链接" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&do=bueaties">查看全部<i>&gt;</i></a>
                        </div>
                        <div class="m-box-bd">
                            <ul id="beautyLive" class="clickStatParent" eid="click/jingcaishijie/meinv" eid_desc="点击/精彩世界/美女"></ul>
                        </div>
                    </div>
                </div><!-- /beauty -->
            </div><!-- /gameFocus-cont -->
            </div><!-- /gameFocus-main -->
            <div class="gameFocus-aside">

                <!-- 轮播  {-->
                <div class="banner">
                    <div id="activeLive" style="height:auto;max-height:210px;width:auto;">
                        <ul id="scroll-ad">
                        </ul>
                    </div>
                </div>
                <!--} 轮播  -->

                <!-- 虎牙新秀 -->
                <div class="rookieLive" id="J_rookieLive">
                    <div class="rookieLive-hd">
                        <div class="side-tit">
                            <a class="tit game_href clickstat" eid="click/jingcaishijie/rookie/more/0" eid_desc="点击/精彩世界/虎牙新秀/查看更多" href="yy://wonderworld-[tabPid=1002&tabSid=2006&uid=]">游戏推荐</a>
                            <a class="more game_href clickstat" eid="click/jingcaishijie/rookie/more/1" eid_desc="点击/精彩世界/虎牙新秀/查看更多" href="yy://wonderworld-[tabPid=1002&tabSid=2006&uid=]">进去看看<i>&gt;</i></a>
                        </div>
                    </div>
                    <div class="rookieLive-bd clickStatParent" eid="click/jingcaishijie/rookie" eid_desc="点击/精彩世界/虎牙新秀">
                        <div class="pic-list" id="J_rlpl" eid="click/jingcaishijie/rookie/zhubo" eid_desc="点击/精彩世界/虎牙新秀/主播">
                            <div class="stage"></div>
                            <div class="stage-handle clickstat" eid="click/jingcaishijie/rookie/zhubo/switch" eid_desc="点击/精彩世界/虎牙新秀/主播/切换">
                                <i class="prev"></i>
                                <i class="next"></i>
                            </div>
                        </div>
                        <div class="txt-list" id="J_rltl" eid="click/jingcaishijie/rookie/zhibo" eid_desc="点击/精彩世界/虎牙新秀/直播">
                            <div class="cont">
                            </div>
                            <i class="sign"></i>
                            <a href="#" class="switch clickstat" eid="click/jingcaishijie/rookie/zhibo/switch" eid_desc="点击/精彩世界/虎牙新秀/直播/切换"><i></i>换一波推荐</a>
                        </div>
                    </div>
                </div>
                
                <div class="other-sociaty">
                    <div class="other-sociaty-hd">
                        <div class="side-tit">
                            <a class="tit" href="#">财富新贵</a>
                        </div>
                    </div>
                    <div class="other-sociaty-bd">
                        <ul class="other-sociaty-list" id="newWealth">
                        </ul>
                    </div>
                </div>
            </div><!-- /gameFocus-aside -->
        </div><!-- /gameFocus -->

        <div class="gameSpecial" id="gameSpecial"></div>

        <div class="gameMore">
            <div class="m-box">
                <div class="m-box-hd">
                    <h3 class="m-tit">更多直播</h3>
                </div>
                <div class="m-box-bd">
                    <div class="list-liveMod">
                        <ul class="clickStatParent" id="moreLiveList"></ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="mod-more">
            <span class="btn-more" id="loadMoreLive">数据加载中</span>
        </div>
    </div>
</div>

<script type="text/javascript" src="../js/global.js" data-loader></script> <!-- // data-loader 属性是 fis3-postpackager-loader 插件的配置 -->
<!--SCRIPT_PLACEHOLDER--> <!-- // fis3-postpackager-loader 插件的配置 -->
<script>
$(function(){
    var app = require('/pages/home');
    new app()
});
</script>
</body>
</html>