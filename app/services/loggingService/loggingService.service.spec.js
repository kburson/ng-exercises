'use strict';
describe('loggingService', function () {

//declaration of variables to be used in test case
    var loggingService, apiUrls;
    var $log, $window, $location, $httpBackend;
   
    var dataError = 'No Data Available';
    var logMessages = 'Log Error Messages';
    var maxpendingLogs = 20;
    var windowObject = {
        loggingMethods: ['error', 'debug', 'exception']
    };

    var exception = {
        message: 'exception message',
        stack: 1
    };

	//injecting the services
    beforeEach(function() {
        module('myApp.services');
        module(function($provide) {
            $provide.value('$window', windowObject);
        });
    });

    //injecting the dependencies
 	beforeEach(inject(function(_$rootScope_, _loggingService_, _$httpBackend_, _$location_, _$log_, _API_URLS_) {
        loggingService = _loggingService_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $log = _$log_;
        apiUrls = _API_URLS_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    //describe block for test
    describe('exception Handler suite', function() {

      	// logData mocked for each test cases for Exception Handler suite.
        var logData = {
                type: 'exception',
                url: 'http://www.mocktest.com',
                message: exception.message,
                stackTrace: exception.stack,
                cause: dataError
        };

        beforeEach(function() {
  			// Mock for getLocationService for each test case
  			spyOn($location, 'absUrl').and.returnValue('http://www.mocktest.com');
        });

        afterAll(function() {
        	logData = null;
        });

        it('check whether the exception is undefined', function() {

            expect(loggingService.exceptionHandler()).toBeUndefined();

        });

        it('post the exceptions to the server if server returns status code 200', function() {	

			$httpBackend.expect('POST', apiUrls.logging, logData).respond(200);
            loggingService.exceptionHandler(exception, dataError);
            $httpBackend.flush();

            // verified in clean-up

        });

        it('cause is set as blank', function() {	

	 		var causeLogData = {
		        type: 'exception',
		        url: 'http://www.mocktest.com',
		        message: exception.message,
		        stackTrace: exception.stack,
		        cause: ''
	        };
			$httpBackend.expect('POST', apiUrls.logging, causeLogData).respond(200);
            loggingService.exceptionHandler(exception);
            $httpBackend.flush();

            // verified in clean-up

        });

        it('post the exceptions to the server if server returns error', function() {  

            // Mock for postLogToServer > processPendingLogQueue > $log.warn
            spyOn($log, 'warn');
            $httpBackend.expect('POST', apiUrls.logging, logData).respond(500, {});
            loggingService.exceptionHandler(exception, dataError);
            $httpBackend.flush();
            expect($log.warn).toHaveBeenCalled();

        });

        it('should process existing pending logs', function() {     

            $httpBackend.expect('POST', apiUrls.logging, logData).respond(500, {});
            for (var i = 0; i <= maxpendingLogs; i++) {
                loggingService.exceptionHandler(exception, dataError);
            }
            $httpBackend.flush();

        });


    });
    describe('debug suite', function() {

     	// logData mocked for each test cases for debug Handler suite.
    	var reqData = {
            type: 'debug',
            url: 'http://www.mocktest.com',
            message: logMessages,
            data: 'datalog'
        };

        beforeEach(function() {

  		    // Mock for getLocationService for each test case
  			spyOn($location, 'absUrl').and.returnValue('http://www.mocktest.com');

        });

        it('post the log to server if loggingMethods has debug in the array', function() {
           
            windowObject.loggingMethods = ['error', 'debug', 'exception'];
			$httpBackend.expect('POST', apiUrls.logging, reqData).respond(200);
            loggingService.debug(logMessages, 'datalog');
            loggingService.debug(logMessages, 'datalog1');

            $httpBackend.flush();

        });


        it('should return undefined if loggingMethods has not debug in the array', function() {

            windowObject.loggingMethods = {};
            expect(loggingService.debug(logMessages, reqData)).toBeUndefined();

        });

    });
    describe('error suite', function() {

     	// logData mocked for each test cases for debug Handler suite.
        var reqData = {
                type: 'error',
                url: 'http://www.mocktest.com',
                message: logMessages
        };

        beforeEach(function() {

  			// Mock for getLocationService for each test case
  				spyOn($location, 'absUrl').and.returnValue('http://www.mocktest.com');

        });

        it('post the log to server if loggingMethods have error in the array', function() {

            windowObject.loggingMethods = ['error', 'debug', 'exception'];
            $httpBackend.expect('POST', apiUrls.logging, reqData).respond(200);
            loggingService.error(logMessages);
            $httpBackend.flush();

        });

        it('post the log to server if loggingMethods does not have error in the array', function() {

            windowObject.loggingMethods = {};
            // Mock for postLogToServer > processPendingLogQueue > $log.warn
            spyOn($log, 'warn');
            expect(loggingService.error(logMessages)).toBeUndefined();

        });

    });


});

