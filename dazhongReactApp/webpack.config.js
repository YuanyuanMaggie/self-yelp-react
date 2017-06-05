var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.export = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname + "app/index.jsx"),
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
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
                loader:'style!css?modules!postcss'
            }, {
                test:/\.(png|gif|jpg|jpge|bmp)$/i,
                loader:'url-loader?limit=5000'
            }, {
                test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                loader:'url-loader?limit=5000'
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
        new webpack.HotModuleReplacementPlugin(), 
        new OpenBrowserPlugin({
          url: 'http://localhost:3000'
        }),

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