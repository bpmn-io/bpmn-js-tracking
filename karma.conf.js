var singleStart = process.env.SINGLE_START;

var coverage = process.env.COVERAGE;

var suite = coverage ? 'test/coverageBundle.js' : 'test/testBundle.js';

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(karma) {

  var config = {

    frameworks: [
      'mocha',
      'sinon-chai',
      'webpack'
    ],

    files: [
      suite
    ],

    preprocessors: {
      [suite]: [ 'webpack', 'env' ]
    },

    reporters: [ 'progress' ].concat(coverage ? 'coverage' : []),

    coverageReporter: {
      reporters: [
        { type: 'lcov', subdir: '.' }
      ]
    },

    browsers: browsers,

    autoWatch: false,
    singleRun: true,

    webpack: {
      mode: 'development',
      resolve: {
        modules: [
          'node_modules',
          __dirname
        ]
      },
      module: {
        rules: [
          {
            test: /\.(css|bpmn|svg)$/,
            use: 'raw-loader'
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                plugins: coverage ? [
                  [ 'istanbul', {
                    include: [
                      'src/**'
                    ]
                  } ]
                ] : []
              }
            }
          }
        ]
      },
      devtool: 'eval-source-map'
    }
  };

  if (singleStart) {
    config.browsers = [].concat(config.browsers, 'Debug');
    config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
  }

  karma.set(config);
};