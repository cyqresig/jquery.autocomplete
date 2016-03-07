/**
 * Created by cyqresig on 2016/2/19.
 */
var path = require("path");
var webpack = require("webpack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

//var entry = [
//    "./src/modules/pageA",
//    "./src/modules/pageB",
//    "./src/modules/pageC",
//]

// returns a Compiler instance
module.exports =

    {

        // configuration
        //entry: [
        //    //"./public/dev/javascripts/entry/pageA",
        //    "./public/dev/javascripts/entry/pageB",
        //    //pageC: "./src/modules/pageC",
        //],
        entry: {
            pageA: [
                "./public/dev/javascripts/entry/pageA",
            ],
            pageB: [
                "./public/dev/javascripts/entry/pageB",
            ]
        },
        output: {
            path: path.join(__dirname, "public/dev/javascripts/entry"), //path.join('./public/dev/', "javascripts"),
            publicPath: "/javascripts/entry/",  //cdn选项。。。
            filename: "[name].bundle.js",
            chunkFilename: "[id].chunk.js"
        },
        plugins: [
            //new ExtractTextPlugin("../css/[name].css",  {
            //    disable: false,
            //    allChunks: false    //false表示只会生成入口
            //}),    //单独使用style标签加载css并设置其路径
            //new HtmlWebpackPlugin({  // Also generate a test.html
            //    filename: './src/modules/pageA.html',
            //    //template: './src/modules/pageA.html'
            //}),
            new CommonsChunkPlugin({
                name: "commons",
                filename: "common.js",
                //chunks: entry,
                //minChunks: entry.length
            }),
            //new webpack.ProvidePlugin({
            //    $: 'jquery'
            //}),//这个可以使jquery变成全局变量，就不用在自己文件require('jquery')了，效果等同自己require，代码会重复打进去。。。
            //new CommonsChunkPlugin('core', 'core.bundle.js'),    //这是第三方库打包生成的文件
        ],
        module: {
            loaders: [
                //{ test: require.resolve('jquery'), loader: 'expose?jQuery'},
               { test: /\.(ejs|tpl)$/, loader: 'ejs'},
                //{test: /\.html$/, loader: "html"},
                { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
                { test: /\.css$/,  loader: 'style-loader!css-loader' },    //loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
            ],
        },
        resolve: {
            alias: {
                jquery: path.join(__dirname, "public/dev/javascripts/lib/jquery.min.js"),
                chosen: path.join(__dirname, "public/dev/javascripts/plugins/chosen/chosen.jquery.min.js"),
                'chosen-css': path.join(__dirname, "public/dev/javascripts/plugins/chosen/chosen.min.css"),
            },
            extensions: ['', '.coffee', '.js']
        }
    }
, function(err, stats) {
    // ...
    if(err) {
        console.log(err);
    }
    if(stats) {
        //console.log(stats);
    }
};