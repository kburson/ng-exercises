'use strict';
describe('loggingService', function () {
  var loggingService, $httpBackend, location, log, $window;

  var errorMessage = 'logError';
  var exception = {
    message: 'unsupported media',
    stack: 2
  };
  var urls = {
    'logging': 'http://localhost:123'
  };
  var windowObject = {
    loggingMethods: ['error', 'debug']
  };
  var cause = 'No data';

  beforeEach(function () {
    module('myApp.services');
    module(function ($provide) {
      $provide.constant('API_URLS', urls);
      $provide.value('$window', windowObject);
    });
  });

  beforeEach(inject(function (_$rootScope_, _loggingService_, _$httpBackend_, _$location_, _$log_) {
    loggingService = _loggingService_;
    $httpBackend = _$httpBackend_;
    location = _$location_;
    log = _$log_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('exceptionHandler()', function () {
    it('should check if the exception is undefined', function () {
      expect(loggingService.exceptionHandler()).toBeUndefined();
    });

    it('should check if the exception is defined and post the exception to server', function () {
      spyOn(location, 'absUrl').and.returnValue('server');
      var logData = {
        type: 'exception',
        url: 'server',
        message: exception.message,
        stackTrace: exception.stack,
        cause: (cause || '')
      };

      $httpBackend.expect('POST', urls.logging, logData).respond(200);
      loggingService.exceptionHandler(exception, cause);
      $httpBackend.flush();
    });

    it('should check if the exception is defined and the server returns error', function () {
      spyOn(location, 'absUrl').and.returnValue('server');
      spyOn(log, 'warn');
      var logData = {
        type: 'exception',
        url: 'server',
        message: exception.message,
        stackTrace: exception.stack,
        cause: (cause || '')
      };

      $httpBackend.expect('POST', urls.logging, logData).respond(500, {});
      loggingService.exceptionHandler(exception, cause);
      $httpBackend.flush();
      expect(log.warn).toHaveBeenCalled();
    });

  });

  describe('error()', function () {
    it('should post the log to server if the logging methods array contain error', function () {
      spyOn(location, 'absUrl').and.returnValue('server');
      var logData = {
        type: 'error',
        url: 'server',
        message: errorMessage
      };

      $httpBackend.expect('POST', urls.logging, logData).respond(200);
      loggingService.error(errorMessage);
      $httpBackend.flush();
    });

    it('should not post to server and return error if the logging methods does not contain any value', function () {
      windowObject.loggingMethods = {};
      spyOn(location, 'absUrl').and.returnValue('server');
      spyOn(log, 'warn');
      var logData = {
        type: 'error',
        url: 'server',
        message: errorMessage
      };
      expect(loggingService.error(errorMessage)).toBeUndefined();
    });

  });

  describe('debug()', function () {
    it('should post the log to server if the logging methods array contain debug', function () {
      spyOn(location, 'absUrl').and.returnValue('server');
      windowObject.loggingMethods = [
        'error', 'debug'
      ];
      var logData = {
        type: 'debug',
        url: 'server',
        message: errorMessage,
        data: "logData"
      };

      $httpBackend.expect('POST', urls.logging, logData).respond(200);
      loggingService.debug(errorMessage, 'logData');
      loggingService.debug(errorMessage, 'logData1');
      $httpBackend.flush();
    });

    it('should not post to server and return error if the logging methods does not contain any value', function () {
      windowObject.loggingMethods = {};
      spyOn(location, 'absUrl').and.returnValue('server');
      spyOn(log, 'warn');
      var logData = {
        type: 'debug',
        url: 'server',
        message: errorMessage,
        data: "logData"
      };
      expect(loggingService.debug(errorMessage, logData)).toBeUndefined();
    });

  });

});

