var vue = require('vue-loader')
var webpack = require('webpack')
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
    entry: {
        app:'./src/main.js',
        vendor: [
            'vue',
            'jquery',
            //'bootstrap',
            //'./lib/js/jquery.mmenu.min.js',
            //'./lib/js/jquery.nicescroll.min.js',
            //'./lib/js/jquery.sparkline.min.js',
            //'./lib/js/minimal.min.js',
        ],
    },
    watch: true,
    output: {
        path: './dist',
        //publicPath: './dist/',
        filename: "build.js",
        //chunkFilename: "[id].chunk.js"
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js', '.css'],
        //别名
        alias: {
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            //不编译第三方/node_modules/
            exclude: /node_modules/,
            loader: 'babel'
        },
            { test: /\.html$/, loader: 'html' },
            {test:/\.css$/, loader: ExtractTextPlugin.extract('style', 'css')}, // enable minimize
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            {test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&name=fonts/[hash:8].[name].[ext]" },
            {test: /\.(jpe?g|png|gif|svg)$/, loader: "url?limit=10000&name=img/[hash:8].[name].[ext]" },
        ]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("style.css"
            , {
            allChunks: true,
            disable: false
        }
        ),
        new webpack.ProvidePlugin({
            //设置全局jquery
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),//这是第三方库打包生成的文件
    ],
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}