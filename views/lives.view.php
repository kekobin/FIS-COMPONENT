<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>虎牙直播</title>
    <link href="./css/reset.css" rel="stylesheet" type="text/css">
    <link href="./css/global.scss" rel="stylesheet" type="text/css">
    <!--STYLE_PLACEHOLDER-->
</head>
<body>
<?php
    $livedata = \bma\thrift\Manager::objArr2Array(json_decode($livedatas));
    $profileTotal = count($livedata);
?>
<div class="wrap-scroll" id="J_scrollbar">
    <div class="wrapper">
        <div class="lives">
            <div class="m-box">
                <div class="m-box-hd">
                    <h3 class="m-tit"><?php echo htmlspecialchars($gName) ?></h3>
                    <?php if (empty($gid)) { ?>
                        <span class="head-more" id="headMore"><i></i>展开筛选</span>
                        <span class="head-close" id="headClose"><i></i>收起筛选</span>
                    <?php } ?>
                    <?php if (!empty($gid)) { ?>
                        <a href="javascript:history.go(-1);" class="go-home">返回首页»</a>
                    <?php } ?>
                </div>

                <div class="m-box-bd">

                <?php if ( empty($gid) ) { ?>
                    <div class="filter-btn-container" id="filterBtnContainer">
                        <div class="filter-btn-group" id="recommendTag">
                            <span class="filter-title">相关标签：</span>
                            <a href="javascript:;" class="all <?php if($selRecommendTag == -1){echo 'active';} ?>" data-recommendtag='-1'>全部</a>
                            <?php 
                                $recommendArr = \bma\thrift\Manager::objArr2Array(json_decode($recommendTagList));
                                foreach ($recommendArr as $key => $value) { ?>
                                 | <a href="javascript:;" class="<?php if($selRecommendTag == $value['id']){echo 'active'; } ?>" data-recommendtag='<?php echo $value["id"]; ?>'><?php echo htmlspecialchars($value['name']) ?></a>
                            <?php }?>
                        </div>
                        <div class="filter-btn-group" id="gameBussType">
                            <span class="filter-title">相关分类：</span>
                            <a href="javascript:;"  class="all <?php if($selGameBussType == -1){echo 'active';} ?>" data-busstype='-1'>全部</a>
                            <?php 
                                $gameBussArr = \bma\thrift\Manager::objArr2Array(json_decode($gameBussTypeList));
                                foreach ($gameBussArr as $key => $value) { 
                                    //屏蔽动漫
                                    if($value['id'] == 7){
                                        continue;
                                    }
                                ?>
                                 | <a href="javascript:;" class="<?php if($selGameBussType == $value['busType']){echo 'active'; } ?>"data-busstype='<?php echo $value["busType"]; ?>'><?php echo $value['typeName']; ?></a>
                            <?php }?>
                        </div>
                        <div class="filter-btn-group" id="gameId">
                            <span class="filter-title">热门游戏：</span>
                            <a href="javascript:;"  class="all <?php if($selGameId == -1){echo 'active';} ?>" data-gameid='-1'>全部</a>
                            <?php 
                                $gameArr = $gameList;
                                foreach ($gameArr as $key => $value) { 
                                    $currentGameArr = $value;
                                    foreach ($currentGameArr as $k => $v) {
                                        
                                    ?>
                                        | <a href="javascript:;" class="<?php if($selGameId == $v['gid']) {echo 'active'; }?>" data-gameid='<?php echo $v["gid"]; ?>'><?php echo htmlspecialchars($v['gameFullName']) ?></a>
                                    <?php } ?>
                            <?php }?>
                        </div>
                    </div>
                <?php } ?>

                <?php if ( !empty($gid) ) { ?>
                    <div class="order-btn-group">
                    <?php if ( $gid == 1 ) { ?>
                        <a<?php echo $recTag == 0 ? ' class="on"' : ''; ?> href="<?php echo APP_URL . 'wonderful/nosession.php?m=Live&gid=1&gName='.$gName; ?>">全部</a>
                        <a<?php echo $recTag == 1 ? ' class="on"' : ''; ?> href="<?php echo APP_URL . 'wonderful/nosession.php?m=Live&gid=1&gName='.$gName.'&recTag=1'; ?>">王者段位</a>
                        <a<?php echo $recTag == 2 ? ' class="on"' : ''; ?> href="<?php echo APP_URL . 'wonderful/nosession.php?m=Live&gid=1&gName='.$gName.'&recTag=2'; ?>">职业选手</a>
                        <a<?php echo $recTag == 4 ? ' class="on"' : ''; ?> href="<?php echo APP_URL . 'wonderful/nosession.php?m=Live&gid=1&gName='.$gName.'&recTag=4'; ?>">美女主播</a>
                    <?php } else {?>
                        <a<?php echo $recTag == 0 ? ' class="on"' : ''; ?> href="<?php echo APP_URL . 'wonderful/nosession.php?m=Live&gid='. $gid.'&gName='.$gName; ?>">全部</a>
                        <?php foreach ($gameRecTags as $tag) { ?>
                        <a<?php echo $recTag == $tag['id'] ? ' class="on"' : ''; ?> href="<?php echo APP_URL . 'wonderful/nosession.php?m=Live&gid='. $gid.'&gName='.$gName . '&recTag=' . $tag['id']; ?>"><?php echo $tag['name'] ?></a>
                        <?php } ?>
                    <?php } ?>
                    </div>
                <?php } ?>

                <?php if ($profileTotal > 0) { ?>
                    <div class="list-liveMod">
                        <ul id="lives_items_id">
                            <?php
                                if (empty($gid) || ( !empty($gid) && ($gid > 100000 && $gid < 200000) ) ) {
                                    $showGameName = true;
                                } else {
                                    $showGameName = false;
                                }

                                $i = 0 ;

                                foreach ($livedata as $sb_ld) {
                                    $i ++ ;
                                    $ld = array();
                                    $ld['recommendTag'] = $sb_ld['getRecommendStatus'];
                                    $ld['recommendTagName'] = $sb_ld['getRecommendName'];
                                    $ld['recommendTagColor'] = $sb_ld['getColor'];
                                    $ld['channel'] = $sb_ld['getChannel'];
                                    $ld['liveChannel'] = $sb_ld['getLiveChannel'];
                                    // $ld['liveSourceType'] = $sb_ld['liveSourceType'];
                                    // $ld['privateHost'] = $sb_ld['privateHost'];
                                    // $ld['screenType'] = $sb_ld['screenType'];
                                    $ld['screenshot'] = $sb_ld['getScreenshortUrls'];
                                    $ld['nick'] = $sb_ld['getNick'];
                                    $ld['introduction'] = $sb_ld['getIntroduction'];
                                    $ld['totalCount'] = $sb_ld['getTotalCount'];
                                    $ld['gid'] = $sb_ld['getGid'];
                                    $ld['gameFullName'] = $sb_ld['getGameFullName'];
                            ?>
                                <li>
                                    <?php require 'common/liveCard.php'; ?>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>

                    <?php if ($profileTotal < 30) { ?>
                        <p class="m-listLoaded">已经加载完全部<?php echo $profileTotal; ?>个直播</p>
                    <?php } else { ?>
                        <p class="m-listLoaded" id="lives_more">正在加载...</p>
                    <?php } ?>

                <?php } else { ?>
                    <p class="empty-info">暂无直播，主播们还在休息呢。</p>
                    <div class="recommend-live">
                        <span class="recommend-tit">推荐直播</span>
                        <div class="list-liveMod">
                            <ul id="recommend_lives" ></ul>
                        </div>
                    </div>
                <?php } ?>

                </div>
            </div>
        </div><!-- /lives -->
    </div><!-- /wrapper -->
</div><!-- /wrap-scroll -->
<script type="text/javascript" src="../js/global.js" data-loader></script> <!-- // data-loader 属性是 fis3-postpackager-loader 插件的配置 -->
<!--SCRIPT_PLACEHOLDER--> <!-- // fis3-postpackager-loader 插件的配置 -->
<script type="text/javascript">
var indexUrl = "<?php echo APP_URL; ?>";

$(function(){
    var itemListPo = require('/pages/lives');

    <?php if( count($livedata) >= 30 ) { ?>
        var firstPage = <?php echo json_encode($livedata); ?>;
        itemListPo.livesInit(indexUrl, firstPage || []);
    <?php } ?>
});
</script>
</body>
</html>