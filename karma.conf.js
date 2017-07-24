//jshint strict: false
module.exports = function (config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/moment/moment.js',

      'common/common.js',

      'components/**/*.component.js',

      'components/**/*.js',

      'utilities/*.js',
      'utilities/**/*.js',

      'services/services.js',
      'services/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'jasmine-matchers', 'sinon'],

    browsers: ['Chrome'],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      '**/!(*.spec).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    reporters: [
      'spec',
      'coverage',
      'junit'
      //'failed'
    ],

    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },

    coverageReporter: {
      type: 'html',
      dir: '../test-reports/coverage/',
      file: 'coverage.html'
    },

    junitReporter: {
      outputDir: '../test-reports',
      outputFile: 'unit.xml',
      suite: 'unit'
    }

  });
};
