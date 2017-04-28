'use strict';
describe('loggingService', function () {

  var loggingService;

  // Load our api.users module
  beforeEach(angular.mock.module('myApp.services'));

  // Set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_loggingService_) {
    loggingService = _loggingService_;
  }));

  it('loggingService should exist',function() {
    expect(loggingService).toBeDefined();
  });

  describe('error method', function () {
    // error method should exists
    it('should exist',function() {
      expect(loggingService.error).toBeDefined();
    });

    // error method should exists
    it('should post error message',function() {
      var errorMessage = 'This is a error message';
      // This method wouldn't return anything so should be undefined
      expect(loggingService.error(errorMessage)).toBeUndefined();
    });
  });
  
  describe('debug method', function () {
    // error method should exists
    it('should exist',function() {
      expect(loggingService.error).toBeDefined();
    });

    // error method should exists
    it('debug post error message',function() {
      var debugMessage = 'This is a debug message';
      // This method wouldn't return anything so should be undefined
      expect(loggingService.error(debugMessage)).toBeUndefined();
    });
  });

  describe('exceptionHandler method', function () {
    // error method should exists
    it('should exist',function() {
      expect(loggingService.exceptionHandler).toBeDefined();
    });

    // error method should exists
    it('exceptionHandler should log and post message',function() {
      
      var exceptionMessage = 'This is a exceptionHandler message';
      // This method wouldn't return anything so should be undefined
      expect(loggingService.debug(exceptionMessage)).toBeUndefined();
    });
  });

});

