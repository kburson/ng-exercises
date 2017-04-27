(function (angular, lodash) {
  'use strict';

  function loggingService($injector) {

    var service = this; // eslint-disable-line consistent-this

    var MAX_PENDING_LOGS = 20;

    var pendingLogs = [];

    var API_URLS = $injector.get('API_URLS');

    var $log = $injector.get('$log');
    var $window = $injector.get('$window');

    var $location; // private var lazy loaded to prevent circular dependency

    // cannot inject these until they are needed because of circular dependency issues
    var $http;     // eslint-disable-line init-declarations
    var $timeout;  // eslint-disable-line init-declarations

    function getLocationService() {
      if (angular.isUndefined($location)) {
        $location = $injector.get('$location');
      }

      return $location;
    }

    function initializeCircularDependencies() {
      $timeout = angular.isUndefined($timeout) ? $injector.get('$timeout') : $timeout;
      $http = angular.isUndefined($http) ? $injector.get('$http') : $http;
    }

    function processPendingLogQueue() {

      if (pendingLogs.length > 0) {

        initializeCircularDependencies();

        $http(pendingLogs[0])
            .then(function () {
              pendingLogs.shift();
              if (pendingLogs.length > 0) {
                processPendingLogQueue();
              } // trigger event to process next pending log and quit
            })
            ["catch"](function (exception) {
          $log.warn('Error server-side logging failed', exception);

          // if more than 1 exception is queued then let the established event loop process them all.
          if (pendingLogs.length === 1) {
            // wait 1 second and try again.
            $timeout(processPendingLogQueue, 60000);
          }
        });
      }
    }

    function consoleLogger(methodName, args) {
      // only log exceptions to the console if 'error' is turned on.
      if (methodName !== 'exception' && lodash.includes($window.loggingMethods, methodName)) {
        $log[methodName].apply($log, args);
      }
    }

    function postLogToServer(methodName, logData) {

      // always post exceptions !!
      if (methodName === 'exception' || lodash.includes($window.loggingMethods, methodName)) {

        consoleLogger(methodName, [].slice.call(arguments));

        var httpConfig = {                          // eslint-disable-line vars-on-top
          timeStamp: Date.now().toString(),
          method: 'POST',
          url: API_URLS.logging, // /api/jsnlogs
          data: logData
        };

        // lets limit the number of pending logs to 20
        if (pendingLogs.length < MAX_PENDING_LOGS) {
          pendingLogs.push(httpConfig);
        }
        processPendingLogQueue();
      }
    }

    function exceptionHandler(exception, cause) {

      if (angular.isUndefined(exception)) {
        return;
      }

      getLocationService();

      var logType = 'exception';

      var data = {
        type: logType,
        url: getLocationService().absUrl(),
        message: exception.message,
        stackTrace: exception.stack,
        cause: (cause || '')
      };

      postLogToServer(logType, data);
    }

    function debug(message, debugData) {

      var logType = 'debug';

      var data = {
        type: logType,
        url: getLocationService().absUrl(),
        message: message,
        data: debugData
      };

      postLogToServer(logType, data);
    }

    function error(errorMessage) {

      var logType = 'error';

      var data = {
        type: logType,
        url: getLocationService().absUrl(),
        message: errorMessage
      };

      postLogToServer(logType, data);
    }

    service.error = error;
    service.debug = debug;
    service.exceptionHandler = exceptionHandler;
  }

  angular.module('myApp.services')
      .service('loggingService', ['$injector', loggingService]);

})(angular, _);
