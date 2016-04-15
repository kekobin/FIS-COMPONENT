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
<div class="wrap-scroll" id="J_scrollbar">
    <div class="wrapper">
        <div class="game-category">
            <div class="m-box">
                <div class="m-box-hd">
                    <h3 class="m-tit"><?php echo $gameName ?></h3>
                </div>

                <div class="m-box-bd">
                <?php if ($total > 0) { ?>
                <div class="list-liveMod">
                    <ul id="lives_items_id">
                    <?php
                        $i = 0 ;
                        foreach ($gameList as $ld) {
                            $i ++ ;
                    ?>
                    <li>
                        <?php require 'common/liveCard.php'; ?>
                    </li>
                    <?php } ?>
                    </ul>
                </div>
                <?php } ?>
                </div>

                <?php if ($total > 0) { ?>

                    <?php if ($total < 40) { ?>
                        <p class="m-listLoaded" id="lives_more">已经加载完全部<?php echo $total; ?>个主播</p>
                    <?php } else { ?>
                        <p class="m-listLoaded" id="lives_more">正在加载...</p>
                    <?php } ?>

                <?php } else { ?>
                    <p class="m-listLoaded" id="lives_more">暂无直播，主播们还在休息呢。</p>
                <?php } ?>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../js/global.js" data-loader></script> <!-- // data-loader 属性是 fis3-postpackager-loader 插件的配置 -->
<!--SCRIPT_PLACEHOLDER--> <!-- // fis3-postpackager-loader 插件的配置 -->
<script>
var indexUrl = "<?php echo APP_URL; ?>";

$(function(){
    var app = require('/pages/category');

    <?php if( $total >= 40 ) { ?>
        var firstPage = <?php echo json_encode($gameList); ?>;
        app.itemListPo.lives3Init(indexUrl, firstPage || [], <?php echo $gameId ?>);
    <?php } ?>
    
    // 珠海统计
    app.report({
        rso: "from_jcsj", 
        rso_desc: "精彩世界",
        eid: "pageview/jcsj/category-<?php echo $gameId ?>",  
        eid_desc:"pageview/精彩世界/<?php echo $gameName ?>"  
    });    
});
</script>

</body>
</html>