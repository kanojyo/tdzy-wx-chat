let publicPath = '';
switch (process.env.NODE_ENV) {
    case 'development':
    publicPath = "dist" //本地环境
        break
    case 'test':
    publicPath = "test" //测试环境
        break
    case 'production':
    publicPath = "dist" //生产环境
        break
}

module.exports = {
    publicPath: '/', //  根路径
    outputDir: publicPath, //  构建输出目录
    assetsDir: 'assets', //  静态资源目录
    lintOnSave: false, //  是否开始eslint保存检测，有效值：true || false || 'error'
    productionSourceMap: false, //  是否需要映射文件
    devServer: {
        open: false, //  是否自动开启游览器
        host: '0.0.0.0', // 本地链接
        port: 8085, // 端口号
        https: false, //  设置https
        hotOnly: true, //  热更新
        proxy:null,
        
    },
    chainWebpack: config => {
        config
            .entry('index')
            .add('babel-polyfill')
    }
};