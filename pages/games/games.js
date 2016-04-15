require('/components/backToTop');
var report = require('/js/mod/report');
var itemListPo = require('/js/mod/itemListPo');

module.exports = itemListPo;

// 统计上报
report({
    rso: "from_jcsj", 
    rso_desc: "精彩世界",
    eid: "pageview/jcsj/gameAll",  
    eid_desc:"pageview/精彩世界/全部游戏"  
});
