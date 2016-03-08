/**
 * Created by cyqresig on 2016/2/19.
 */
var path = require("path");
var webpack = require("webpack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//test
// returns a Compiler instance
module.exports =

    {
        // configuration
        entry: {
            demo: [
                "./demo/demo",
            ]
        },
        output: {
            path: path.join(__dirname, "demo"), //path.join('./public/dev/', "javascripts"),
            publicPath: "/demo/",  //cdn选项。。。
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
                name: "common",
                filename: "common.js",
                //chunks: entry,
                //minChunks: entry.length
            }),
        ],
        module: {
            loaders: [
                //{ test: require.resolve('jquery'), loader: 'expose?jQuery'},
                { test: /\.(ejs|tpl)$/, loader: 'ejs'},
                //{test: /\.html$/, loader: "html"},
                { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' }, // use ! to chain loaders
                { test: /\.css$/,  loader: 'style-loader!css-loader' },    //loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
            ],
        },
        resolve: {
            //alias: {
            //    jquery: path.join(__dirname, "public/dev/javascripts/lib/jquery.min.js"),
            //    chosen: path.join(__dirname, "public/dev/javascripts/plugins/chosen/chosen.jquery.min.js"),
            //    'chosen-css': path.join(__dirname, "public/dev/javascripts/plugins/chosen/chosen.min.css"),
            //    'nprogress-css': path.join(__dirname, "public/dev/css/nprogress.css"),
            //},
            extensions: ['', '.coffee', '.js']
        }
}, function(err, stats) {
    // ...
    if(err) {
        console.log(err);
    }
    if(stats) {
        //console.log(stats);
    }
};