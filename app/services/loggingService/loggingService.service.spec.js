'use strict';
describe('loggingService', function () {

  	var $injector, loggingService, API_URLS, $log, $window;
	var $location; // private var lazy loaded to prevent circular dependency
    // cannot inject these until they are needed because of circular dependency issues
    var $http;     // eslint-disable-line init-declarations
	var pendingLogs = [];

	beforeEach(module('myApp.services'));

   beforeEach(inject(function ($injector, _loggingService_, $location, $http, $timeout, _$rootScope_){
	    $injector = $injector;
	    loggingService = _loggingService_;
	    $location = $location;
	    $http = $http;
	    API_URLS = API_URLS;
	    $log = $log;
	    $window = $window;
	    $timeout = $timeout;
	    $scope = $rootScope.$new();
  }));

   it('should test $location service', function(){
	  	var result =loggingService.getLocationService();
	  	expect(result).toBe($location);
	});

	it('should test $timeout, $http service', function(){
	  	loggingService.initializeCircularDependencies();
	  	expect($scope.$timeout).toEqual($timeout);
	  	expect($scope.$http).toEqual($http);
	});

	it('should test debug method', function(){
	  	loggingService.debug("Success","one");
	  	expect($scope.logType).toEqual("debug");
	});

	it('should test error method', function(){
	  	loggingService.error("failure");
	  	expect($scope.logType).toEqual("error");
	});

	it('should test exceptionHandler method', function(){
	  	loggingService.exceptionHandler({"message":"exception","stack":"102"},"main");
	  	expect($scope.logType).toEqual("exception");
	  	expect($scope.data.message).toEqual("exception");
	});

});

