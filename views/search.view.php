<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>搜索结果</title>
    <link href="/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/css/global.scss" rel="stylesheet" type="text/css">
    <!--STYLE_PLACEHOLDER-->
</head>
<body>
	<div class="wrap-scroll" id="J_scrollbar">
    	<div class="wrapper">
 
    		<div class="search-bar" id="search-bar">
    			<div class="search-input">
    				<input  name="hsk" type="text" value="主播、频道、游戏" autocomplete="off">
	                <div class="search-btn clickstat" id="searchBtn" eid="click/jingcaishijie/sousuoanniu" eid_desc="点击/精彩世界/搜索按钮点击">
	                	<i class="search-icon"></i>
	                </div>
	            </div>
	            <div class="search-list">
	                <div id="historySearchContainer" class="history">
	                    <div class="search-title">
	                        历史搜索记录
	                    </div>
	                    <ul class="search-history clickStatParent" id="historySearch" eid="click/jingcaishijie/lishijilu" eid_desc="点击/精彩世界/历史搜索记录点击"></ul>
	                </div>

	                <div class="relevance" id="relevanceGameContainer">
	                    <div class="search-title">
	                        搜<span class="keyword"></span>的相关游戏
	                    </div>
	                    <ul class="search-history clickStatParent" id="relevanceGame" eid="click/jingcaishijie/sousuoxialakuang" eid_desc="点击/精彩世界/搜索下拉框"></ul>
	                </div>

	                <div class="relevance" id="relevanceAnchorContainer">
	                    <div class="search-title">
	                        搜<span class="keyword"></span>的相关的主播
	                    </div>
	                    <ul class="search-history ahchor clickStatParent" id="relevanceAnchor" eid="click/jingcaishijie/sousuoxialakuang" eid_desc="点击/精彩世界/搜索下拉框"></ul>
	                </div>
	            
	                <div id="hotWordContainer" class="hot">
	                    <div class="search-title today-hot">
	                        今日热搜
	                    </div>
	                    <ul class="search-recommend clickStatParent" id="hotWord" eid="click/jingcaishijie/jinriresou" eid_desc="点击/精彩世界/今日热搜"></ul>
	                </div>
	            </div>
    		</div>

    		<div class="search-result">
    			<div class="back">
	    			<a href="javascript:history.go(-1);" class="clickstat" eid="click/jingcaishijie/sousuo/fanhuishouye" eid_desc="点击/精彩世界/搜索结果页/返回首页">返回首页</a>
	    		</div>

    			<div class="result-container anchor">
    				<div class="result-title">
	    				<h3>主播</h3>
	    				<span class="spread" id="anchorSpread">
	    					展开<i class="spread-icon"></i>
	    				</span>
	    				<span class="spread" id="un_anchorSpread">
	    					收起<i class="spread-icon-up"></i>
	    				</span>
	    			</div>
    				<ul id="resultAnchor" class="clickStatParent" eid="click/jingcaishijie/sousuo/zhubo" eid_desc="点击/精彩世界/搜索结果页/主播总点击">
    					
    				</ul>
    				<div class="loading" id="anchorLoading">
    					<i class="icon-loading"></i> 
    					<span class="loading-info"> 数据加载中 </span>
    				</div>
    			</div>

    			<div class="result-container game">
    				<div class="result-title">
	    				<h3>游戏</h3>
	    				<a class="spread more-game" href="yy://wonderworld-[tabPid=1002&tabSid=2005&uid=]">
	    					更多<i class="more-icon more-game"></i>
	    				</a>
	    			</div>
    				<div class="game-bd" class="clickStatParent" eid="click/jingcaishijie/sousuo/youxi" eid_desc="点击/精彩世界/搜索结果页/游戏总点击">
                        <div class="game-list" id="resultGame"></div>
    				</div>
    				<div class="loading" id="gameLoading">
    					<i class="icon-loading"></i> 
    					<span class="loading-info"> 数据加载中 </span>
    				</div>
    			</div>

    			<div class="result-container live">
    				<div class="result-title">
	    				<h3>直播</h3>
	    				<!-- <div class="order-panel">
	    					<span id="allLive">综合</span>
	    					<span id="newestLive">最新</span>
	    					<span id="hotestLive">最热</span>
	    				</div> -->
	    			</div>
                    <div class="list-liveMod">
        				<ul id="resultLive" class="clickStatParent" eid="click/jingcaishijie/sousuo/zhibo" eid_desc="点击/精彩世界/搜索结果页/直播总点击">
        				</ul>
                    </div>
    				<div class="loading" id="liveLoading">
    					<i class="icon-loading"></i> 
    					<span class="loading-info"> 数据加载中 </span>
    				</div>
    			</div>

    		</div>

    		<div class="search-null">
    			<h4 id="noResultTips" style="display:none;">搜索不到该关键词的相关结果哦~</h4>
	    		<div class="list-liveMod">
                    <ul id="recommendLive"></ul>
	            </div>
		    </div>
    	</div>
    </div>


<script type="text/javascript" src="../js/global.js" data-loader></script> <!-- // data-loader 属性是 fis3-postpackager-loader 插件的配置 -->
<!--SCRIPT_PLACEHOLDER--> <!-- // fis3-postpackager-loader 插件的配置 -->
<script>
$(function(){
    require('/pages/search');
});
</script>
</body>
</html>