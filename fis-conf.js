/*!
 * fis配置 
 * http://fis.baidu.com/
 */

fis.set('project.ignore', ['fis-conf.js', '*.cmd']);

// sass编译 (npm install -g fis-parser-sass)
fis
.match('/**.{scss,sass}', {    
    rExt: '.css',
    parser: fis.plugin('sass'),
    isCssLike: true,
    useSprite: true
})

// css sprite
fis.match('::packager', {
  spriter: fis.plugin('csssprites')
});

fis.match('/**.{tpl,php}',{
    isHtmlLike: true
});

// 模块化
fis.hook('commonjs')    // npm install [-g] fis3-hook-commonjs (doc: https://github.com/fex-team/fis3-hook-commonjs)
.match('/{components,pages,js/mod}/**.js', {
    isMod: true
})

// 组件化
fis.match('/{components,pages}/**', {
    useSameNameRequire: true
})

// 打包加载
fis.match('::package', {    // npm install [-g] fis3-postpackager-loader (doc: https://github.com/fex-team/fis3-postpackager-loader)
    postpackager: fis.plugin('loader', {
        obtainScript: false,
        obtainStyle: false,
        resourceType: 'commonJs',
        sourceMap: true,
        useInlineMap: true,
        allInOne: true
    })
});

// 将复用率高的资源单独打包
fis.match('/components/{backToTop,liveCard}/**.js', {
    packTo: '/pkg/common.js'
})
.match('/components/{backToTop,liveCard}/**.{scss,css}', {
    packTo: '/pkg/common.css'
});

/*
 * 发布
 */
var root = 'ww'    // Wonderful World

fis.match('/views/**', {
    deploy: fis.plugin('local-deliver', {
        to: '../../apps/live_main/iframe/wonderful/'
    })
})

// 开发环境
fis.match('!/views/**', {
    domain: 'http://dev.huyastatic.com/' + root,
    deploy: fis.plugin('local-deliver', {
        to: '../../huya_assets/dev/' + root
    })
})

// 测试环境
fis.media('test')
.match('!/views/**', {
    domain: 'http://test.dwstatic.com/' + root,
    deploy: fis.plugin('local-deliver', {
        to: '../../huya_assets/test_dwstatic_huya/' + root
    })
})

// 生产环境
fis.media('prod')
.match('*.js', {
    optimizer: fis.plugin('uglify-js')
})
.match('*.{css,scss,sass}', {
    optimizer: fis.plugin('clean-css')
})
.match('*.png', {
    optimizer: fis.plugin('png-compressor')
})
.match('!/views/**', {
    useHash: true,
    domain: 'http://a.dwstatic.com/huya/' + root,
    deploy: fis.plugin('local-deliver', {
        to: '../../huya_assets/a_dwstatic_huya/' + root
    })
})