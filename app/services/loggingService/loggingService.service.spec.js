'use strict';
describe('loggingService', function() {

    var loggingService;
    var $location;
    var $log;
    var $window;
    var $httpBackend;
    var API_URLS;

    var windowObject = {
        loggingMethods: ['error', 'debug', 'exception']
    };

    var exception = {
        message: 'exception message',
        stack: 1,
    };

    var dataError = 'Data not available';
    var logMessages = 'log error';

    beforeEach(function() {
        module('myApp.services');
        module('myApp.common');
        module(function($provide) {
            $provide.value('$window', windowObject);
        });
    });

    beforeEach(inject(function(_$rootScope_, _loggingService_, _$httpBackend_, _$location_, _$log_, _API_URLS_) {
        loggingService = _loggingService_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $log = _$log_;
        API_URLS = _API_URLS_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('exception Handler', function() {
        it('check if the exception is undefined', function() {
            expect(loggingService.exceptionHandler()).toBeUndefined();
        });

        it('post the exceptions to the server if server returns status code 200', function() {

            // Mock for getLocationService
            spyOn($location, 'absUrl').and.returnValue('http://www.xyz.com');

            var reqData = {
                type: 'exception',
                url: 'http://www.xyz.com',
                message: exception.message,
                stackTrace: exception.stack,
                cause: dataError
            };

            $httpBackend.expect('POST', API_URLS.logging, reqData).respond(200);
            loggingService.exceptionHandler(exception, dataError);
            $httpBackend.flush();
        });

        it('post the exceptions to the server if server returns error', function() {
            // Mock for getLocationService
            spyOn($location, 'absUrl').and.returnValue('http://www.xyz.com');

            // Mock for postLogToServer > processPendingLogQueue > $log.warn
            spyOn($log, 'warn');

            var logData = {
                type: 'exception',
                url: 'http://www.xyz.com',
                message: exception.message,
                stackTrace: exception.stack,
                cause: dataError
            };

            $httpBackend.expect('POST', API_URLS.logging, logData).respond(500, {});
            loggingService.exceptionHandler(exception, dataError);
            $httpBackend.flush();
            expect($log.warn).toHaveBeenCalled();
        });

        it('should process existing pending logs if pending log array contains more than MAX_PENDING_LOG', function() {
            // Mock for getLocationService
            spyOn($location, 'absUrl').and.returnValue('http://www.xyz.com');
            var logData = {
                type: 'exception',
                url: 'http://www.xyz.com',
                message: exception.message,
                stackTrace: exception.stack,
                cause: dataError
            };

            $httpBackend.expect('POST', API_URLS.logging, logData).respond(500, {});
            for (var i = 0; i < 21; i++) {
                loggingService.exceptionHandler(exception, dataError);
            }
            $httpBackend.flush();
        });

    });

    describe('debug', function() {
        it('post the log to server if loggingMethods has debug in the array', function() {
            // Mock for getLocationService
            spyOn($location, 'absUrl').and.returnValue('http://www.xyz.com');
            windowObject.loggingMethods = [
                'error', 'debug', 'exception'
            ];

            var reqData = {
                type: 'debug',
                url: 'http://www.xyz.com',
                message: logMessages,
                data: 'datalog'
            };

            $httpBackend.expect('POST', API_URLS.logging, reqData).respond(200);
            loggingService.debug(logMessages, 'datalog');
            loggingService.debug(logMessages, 'datalog1');

            $httpBackend.flush();
        });


        it('should return undefined if loggingMethods has not debug in the array', function() {
            windowObject.loggingMethods = {};
            var reqData = {
                type: 'debug',
                url: 'server',
                message: logMessages,
                data: 'datalog'
            };
            expect(loggingService.debug(logMessages, reqData)).toBeUndefined();
        });

    });


    describe('error', function() {
        it('post the log to server if loggingMethods have error in the array', function() {
            // Mock for getLocationService
            spyOn($location, 'absUrl').and.returnValue('http://www.xyz.com');

            var reqData = {
                type: 'error',
                url: 'http://www.xyz.com',
                message: logMessages
            };

            windowObject.loggingMethods = ['error', 'debug', 'exception'];
            $httpBackend.expect('POST', API_URLS.logging, reqData).respond(200);
            loggingService.error(logMessages);
            $httpBackend.flush();
        });

        it('post the log to server if loggingMethods does not have error in the array', function() {
            windowObject.loggingMethods = {};
            spyOn($location, 'absUrl').and.returnValue('http://www.xyz.com');

            // Mock for postLogToServer > processPendingLogQueue > $log.warn
            spyOn($log, 'warn');

            var reqData = {
                type: 'error',
                url: 'http://www.xyz.com',
                message: logMessages
            };
            expect(loggingService.error(logMessages)).toBeUndefined();
        });

    });

})