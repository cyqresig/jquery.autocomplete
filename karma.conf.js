// Karma configuration
// Generated on Thu Mar 10 2016 15:05:26 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      //'demo/**/*.js',
      'test/**/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //'demo/**/*.js': ['coverage'],   //只有入口文件可以测试覆盖率, 入口文件不能引用入口文件
      'test/**/*.test.js': ['webpack']
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      plugins: [

      ],
      module: {
        loaders: [
          { test: /\.(ejs|tpl)$/, loader: 'ejs'},
          { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' }, // use ! to chain loaders
          { test: /\.css$/,  loader: 'style-loader!css-loader' },    //loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
          {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ],
      },
      resolve: {
        extensions: ['', '.coffee', '.js']
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
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
      publicPath: '/test/',
      //publicPath: publicPath,
      headers: { "X-Custom-Header": "yes" },
      stats: { colors: true },
    },

    //// optionally, configure the reporter
    //coverageReporter: {
    //  type : 'html',
    //  dir : 'coverage/'
    //},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'], //['Chrome', 'Safari', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
