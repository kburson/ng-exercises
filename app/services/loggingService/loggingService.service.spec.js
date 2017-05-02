'use strict';
describe('loggingService', function() {
    var loggingService, $httpBackend, log, location, API_URLS;
    var cause = 'data is null';
    var exception = {
        message: 'pendingLogs is not defined',
        stack: 10
    };
    var data = {
        type: 'exception',
        url: 'localhost',
        message: exception.message,
        stackTrace: exception.stack,
        cause: (cause || '')
    };

    beforeEach(function() {
        module('myApp.services');
        module('myApp.common');
    });

    beforeEach(inject(function(_$rootScope_, _loggingService_, _$httpBackend_, _$location_, _$log_, _API_URLS_) {
        log = _$log_;
        loggingService = _loggingService_;
        API_URLS = _API_URLS_;
        $httpBackend = _$httpBackend_;
        location = _$location_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('exceptionHandler()', function() {

        it('should return undefined if the exception is not defined', function() {
            expect(loggingService.exceptionHandler()).toBeUndefined();
        });

        it('should check if the exception is defined and post the exception to server', function() {
            spyOn(location, 'absUrl').and.returnValue('localhost');
            $httpBackend.expect('POST', API_URLS.logging, data).respond(200);
            loggingService.exceptionHandler(exception, cause);
            $httpBackend.flush();
        });

        it('should check if the exception is defined and the server returns error', function() {
            spyOn(location, 'absUrl').and.returnValue('localhost');
            spyOn(log, 'warn');
            $httpBackend.expect('POST', API_URLS.logging, data).respond(500, {});
            loggingService.exceptionHandler(exception, cause);
            $httpBackend.flush();
            expect(log.warn).toHaveBeenCalled();
        });

    });

});