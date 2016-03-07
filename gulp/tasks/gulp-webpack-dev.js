/**
 * @fileOverview 开发时使用的前端自动化工作流gulp+webpack
 * @author leon.chen
 * @version
 * Created on 2016/2/26.
 */
var path = require('path');
var extend = require('util')._extend;
var serve = require('gulp-serve');
var livereload = require('gulp-livereload');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var gutil = require('gulp-util');
var gulp = require('gulp');
var webpackConfig = require('./../../webpack.config.js');
var inject = require('connect-livereload')();
var path = require('path');


var paths = {
    scripts: ['./demo/**/*.js'],
    // file list for watching
    asserts: ['./demo/css/**/*.css', './demo/images/**/*.*', './demo/**/*.html']
};

gulp.task('default', ['build-dev']);

gulp.task('build-dev', ['serve'], function () {
    livereload.listen({
        start: true
    })
    // build js files on change
    //gulp.watch(paths.scripts, ['webpack:build-dev'])
    //var watcher = gulp.watch(paths.asserts)
    //watcher.on('change', function (e) {
    //    livereload.changed(e.path)
    //});
    //gulp.watch(paths.asserts, ['webpack:build-dev']);
    var watcher = gulp.watch(paths.asserts)
    watcher.on('change', function (e) {
        livereload.changed(e.path)
    });
});

// static server
gulp.task('serve', serve({
    root: [__dirname],
    // inject livereload script ot html
    middleware: inject
}));


gulp.task('webpack:dev-server', function () {
    //single configuration
    var devServerConfig = extend({}, webpackConfig);
    // for debugging
    devServerConfig.devtool = 'sourcemap';
    devServerConfig.debug = true;
    // webpack need this to send request to webpack-dev-server
    devServerConfig.plugins = devServerConfig.plugins || [];
    devServerConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // inline mode
    //devServerConfig.entry.unshift('webpack-dev-server/client?http://localhost:9090', 'webpack/hot/dev-server');
    Object.keys(devServerConfig.entry).forEach(function(key) {
        devServerConfig.entry[key].unshift('webpack-dev-server/client?http://localhost:9090', 'webpack/hot/dev-server');
    });

    ////multiple configuration
    //var publicPath, devServerConfig, devServerMultipleConfig = [];
    //webpackConfig.forEach(function(config) {
    //    devServerConfig = extend({}, config);
    //    if(!publicPath) {
    //        publicPath = devServerConfig.output.publicPath;
    //    }
    //    // for debugging
    //    devServerConfig.devtool = 'sourcemap';
    //    devServerConfig.debug = true;
    //    devServerConfig.plugins = devServerConfig.plugins || [];
    //    devServerConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    //    // inline mode
    //    devServerConfig.entry.unshift('webpack-dev-server/client?http://localhost:9090', 'webpack/hot/dev-server');
    //
    //    devServerMultipleConfig.unshift(devServerConfig);
    //});
    ////console.log(devServerMultipleConfig);
    //console.log(publicPath);

    var compiler = webpack(devServerConfig);
    //var compiler = webpack(devServerMultipleConfig);
    new webpackDevServer(compiler, {
        // webpack-dev-server options

        //contentBase: "http://node.doorto.com:3000",
        // or: contentBase: "http://localhost/",

        hot: true,
        // Enable special support for Hot Module Replacement
        // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
        // Use "webpack/hot/dev-server" as additional module in your entry point
        // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

        // Set this as true if you want to access dev server from arbitrary url.
        // This is handy if you are using a html5 router.
        historyApiFallback: false,

        // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
        // Use "*" to proxy all paths to the specified server.
        // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
        // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
        //proxy: {
        //    "*": "http://node.doorto.com:3000"
        //},

        // webpack-dev-middleware options
        //quiet: false,
        //noInfo: false,
        lazy: false,
        //filename: "bundle.js",
        //watchOptions: {
        //    aggregateTimeout: 300,
        //    poll: 1000
        //},
        publicPath: devServerConfig.output.publicPath,
        //publicPath: publicPath,
        headers: { "X-Custom-Header": "yes" },
        stats: { colors: true },
    }).listen(9090, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err)
        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:9090/')
    })
})