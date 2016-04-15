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
        <div class="game-box">
            <div class="m-box">
                <div class="m-box-hd">
                    <h3 class="m-tit">
                        <?php
                            if ($bussType == 0) {
                                echo '全部游戏';
                            } else if ($bussType == 1) {
                                echo '网游竞技';
                            } else if ($bussType == 2) {
                                echo '单机热游';
                            } else if ($bussType == 8) {
                                echo '娱乐综艺';
                            } else if ($bussType == 3) {
                                echo '手游休闲';
                            } else {
                                echo '其他';
                            }
                        ?>
                    </h3>
                    <span class="sub-title"><?php echo !is_numeric($allGameCount) ? 0 : number_format($allGameCount); ?>款游戏正在直播</span>
                    <div class="game-filter">
                        <ul>
                            <li<?php echo $bussType == 0 ? ' class="cur"' : '' ?>><a href="<?php echo APP_URL . 'wonderful/nosession.php?m=Game' ?>">全部</a></li>
                            <li<?php echo $bussType == 1 ? ' class="cur"' : '' ?>><a href="<?php echo APP_URL . 'wonderful/nosession.php?m=Game&bussType=1' ?>">网游竞技</a></li>
                            <li<?php echo $bussType == 2 ? ' class="cur"' : '' ?>><a href="<?php echo APP_URL . 'wonderful/nosession.php?m=Game&bussType=2' ?>">单机热游</a></li>
                            <li<?php echo $bussType == 8 ? ' class="cur"' : '' ?>><a href="<?php echo APP_URL . 'wonderful/nosession.php?m=Game&bussType=8' ?>">娱乐综艺</a></li>
                            <li<?php echo $bussType == 3 ? ' class="cur"' : '' ?>><a href="<?php echo APP_URL . 'wonderful/nosession.php?m=Game&bussType=3' ?>">手游休闲</a></li>
                        </ul>
                    </div>
                </div>
                <div class="m-box-bd"> 
                    <ul class="game-list" id="games_items_id">
                    </ul>
                </div>
            </div>
        </div>

        <p class="m-listLoaded" id="games_more">正在加载...</p>
    </div>
</div>

<script type="text/javascript" src="../js/global.js" data-loader></script> <!-- // data-loader 属性是 fis3-postpackager-loader 插件的配置 -->
<!--SCRIPT_PLACEHOLDER--> <!-- // fis3-postpackager-loader 插件的配置 -->
<script>
var indexUrl = "<?php echo APP_URL; ?>";

$(function(){
    var itemListData = <?php echo $games; ?>;
    var app = require('/pages/games');

    app.init(itemListData,'games',30,'<?php echo APP_URL; ?>','<?php echo APP_UPLOAD_MATCH_SERVER_HOST; ?>');
});
</script>
</body>
</html>