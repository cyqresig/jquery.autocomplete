/**
 * @fileOverview    webpack生成演示环境打包JS使用
 * @author leon.chen
 * @version
 * Created on 2016/2/27.
 */

var webpack = require('webpack');
var gulp = require('gulp');
var webpackDistConfig = require('./../../webpack.dist.config.js');

gulp.task('webpack:dist', function () {
    webpack(webpackDistConfig, function(err, stats) {
        // ...
        if(err) {
            console.log(err);
        }
        if(stats) {
            //console.log(stats);
        }
    });
});