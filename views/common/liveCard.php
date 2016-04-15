<div class="liveMod J_liveMod" data-channel="<?php echo $ld['channel']; ?>" data-livechannel="<?php echo $ld['liveChannel']; ?>" data-type="<?php echo $ld['liveSourceType']==2 ? $ld['privateHost'] : '' ?>">

    <?php if(!empty($ld['recommendTagName'])){ ?>
        <?php if($ld['recommendStatus'] == 16) {?>
            <span class="liveMod-tag liveMod-tag-0"></span>
        <?php } else { ?>
            <span class="liveMod-tag liveMod-tag-1" style="background: #<?php echo $ld['recommendTagColor'] ?>;"><?php echo $ld['recommendTagName'] ?></span>
        <?php } ?>
    <?php } ?>

    <a class="liveMod-pic J_enterLive" href="#">
        <?php if($ld['screenType']==1) { ?>
            <img src="<?php echo $ld['screenshot'] ?>?imageview/4/0/w/130/h/230/rotate/270" onerror="this.onerror='';this.src='http://www.huya.com/live2/statics/img/default_live.jpg'">
        <?php } else { ?>
            <img src="<?php echo $ld['screenshot'] ?>?imageview/4/0/w/230/h/130/blur/1" onerror="this.onerror='';this.src='http://www.huya.com/live2/statics/img/default_live.jpg'">
        <?php } ?>
        <span class="m-mask"><i></i></span>
    </a>
    <div class="liveMod-contWrap">
        <div class="liveMod-cont">
            <a class="liveMod-nick J_enterLive" href="#" title="<?php echo htmlspecialchars($ld['nick']) ?>"><?php echo htmlspecialchars($ld['nick']) ?></a>
            <a class="liveMod-desc J_enterLive" href="#"><?php echo $ld['introduction'] ?></a>
            <div class="liveMod-note">
                <p class="liveMod-count"><i></i><em><?php echo number_format($ld['totalCount']); ?></em></p>
                <?php if ($showGameName) { ?>
                <a class="liveMod-gName" href="http://iframe.huya.com/wonderful/nosession.php?m=Live&gid=<?php echo $ld['gid'] ?>&gName=<?php echo htmlspecialchars($ld['gameFullName']) ?>"><?php echo htmlspecialchars($ld['gameFullName']) ?></a>
                <?php } ?>
            </div>
        </div>
    </div>
</div>