process.env.CHROME_BIN = '/usr/bin/google-chrome';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      clearContext: false
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'results.xml',
      useBrowserName: false
    },

    reporters: ['progress', 'coverage', 'junit'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: false,
    restartOnFileChange: false,

    browsers: ['ChromeHeadlessCI'],
    singleRun: true,

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--remote-debugging-port=9222'
        ]
      }
    }
  });
};