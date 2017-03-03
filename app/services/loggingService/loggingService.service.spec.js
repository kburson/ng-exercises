'use strict';
describe('loggingService Suite', function() {
	beforeEach(module('myApp.services')); // load module

	it('TBD', function() { 
		var $loggingService;

		//creates service reference 
		beforeEach(inject(function(_$loggingService_) {
			$loggingService = _$loggingService_;
		}));

		it('loggingService should exist', function() {
			expect($loggingService).toBeDefined();
		});


		/*service.error = error; */

		describe('method error Test', function() {
			it('error method should exist', function() {
				expect($loggingService.error).toBeDefined();
			});

			it('getLocationService method should exist', function() {
				expect($loggingService.getLocationService).toBeDefined();
			});

			it('error method execution ', function() {
				expect($loggingService.error('error message')).toHaveBeenCalled();
			});

			it('error method execution with null', function() {
				expect($loggingService.error('')).toBeUndefined();
			});


		});

		/*  service.debug = debug; */

		describe('method debug Test', function() {
			it('error method should exist', function() {
				expect($loggingService.debug).toBeDefined();
			});

			it('debug method execution', function() {
				expect($loggingService.debug('debug message', 'debug data')).toHaveBeenCalled();
			});

			it('debug method execution with null debug message', function() {
				expect($loggingService.debug('', 'debug data')).toBeUndefined();
			});

			it('debug method execution with null debug data', function() {
				expect($loggingService.debug('debug message', '')).toBeUndefined();
			});

			it('debug method execution with null parameters', function() {
				expect($loggingService.debug('', '')).toBeUndefined();
			});

		});

		/* service.exceptionHandler = exceptionHandler;*/

		describe('method exceptionHandler Test', function() {
			it('exceptionHandler method should exist', function() {
				expect($loggingService.exceptionHandler).toBeDefined();
			});

			
			describe('method initializeCircularDependencies Test', function() {
				it('initializeCircularDependencies method should exist', function() {
					expect($loggingService.initializeCircularDependencies).toBeDefined();
				});
			});

			describe('method consoleLogger Test', function() {
				it('consoleLogger method should exist', function() {
					expect($loggingService.consoleLogger).toBeDefined();
				});
			}); 

			describe('method processPendingLogQueue Test', function() {
				it('processPendingLogQueue method should exist', function() {
					expect($loggingService.processPendingLogQueue).toBeDefined();
				});


				it("expects POST http calls and returns mock data", inject(function($http, $httpBackend) {
					var url = '/api/jsnlogs',
						data = 'mock data',
						timeStamp = Date.now().toString(),
						successCallback = jasmine.createSpy('success'),
						errorCallback = jasmine.createSpy('error');

					
					$httpBackend.expectPOST(timeStamp, url, data, function(headers) {
						//
						return true;
					}).respond(500, 'fails');

					// Call http service
					$http({
						timeStamp : timeStamp,
						method: 'POST',
						url: 'url',
						data: data
					}).success(successCallback).error(errorCallback);

					// flush response
					$httpBackend.flush();

					// Verify expectations
					expect(successCallback).not.toHaveBeenCalled();
					expect(errorCallback.mostRecentCall.args).toContain('fails');
					expect(errorCallback.mostRecentCall.args).toContain(500);
				}));

				/*var $log;

				beforeEach(inject(function(_$log_) {
					$log = _$log_;
				}));

				afterEach(function() {
					console.log($log.debug.logs);
				});*/
			});

			describe('method postLogToServer Test', function() {
				it('postLogToServer method should exist', function() {
					expect($loggingService.postLogToServer).toBeDefined();
				});
			});


			it('exceptionHandler method execution', function() {
				expect($loggingService.exceptionHandler('exception message', 'cause')).toBeUndefined(); 
      });


		});
	});
});
