var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-broswer-webpack-plugin');

module.export = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname + "/app/index.jsx"),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },{
                text: /\.less$/,
                exclude:/node_modules/,
                loader:'style!css!postcss!less'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader:'style!css?modules!postcss'// 感叹号的作用在于使同一文件能够使用不同类型的loader (css-loader, style-loader)
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new OpenBrowserPlugin({
          url: 'http://localhost:3000'
        }),
        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
}