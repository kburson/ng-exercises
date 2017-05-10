"use strict";

describe('featureToggleParser', function () {

 var $log, featureToggleParser;
 var newToggles = {};



//injecting the services
    beforeEach(function() {
        module('myApp.utilities');
    });

	beforeEach(inject(function(_$rootScope_, _$log_,_featureToggleParser_) {
        $log = _$log_;
        featureToggleParser = _featureToggleParser_;

        var baseTime = new Date(2017, 4, 10);
        jasmine.clock().mockDate(baseTime);
        jasmine.clock().install();
       
    }));

    afterEach(function() {
    	jasmine.clock().uninstall();
    });

    describe('parseToggleObject suite', function() {

		it('should check if toggle object is empty',function() {

		  	expect(featureToggleParser.parseToggleObject(newToggles)).toEqual({});

		});

		it('should return moment parsed date object as string',function() {

 			var strFeaturesObject = {
 				dateString: new Date().toString(),
 			};
 			var returnedObj = { dateString: moment(new Date().toString()) };
		  	expect(featureToggleParser.parseToggleObject(strFeaturesObject)).toEqual(returnedObj);

		});

 		it('should return moment parsed date object',function() {

 			var datefeaturesObject = {
 				dateObj: new Date()
 			};
 			var returnedObj = { dateObj: moment(new Date()) };
		  	expect(featureToggleParser.parseToggleObject(datefeaturesObject)).toEqual(returnedObj);

		});

		it('should return same object if it contains boolean value',function() {

 			var datefeaturesObject = {
 				bool: true
 			};
 			var returnedObj = { bool: true };
		  	expect(featureToggleParser.parseToggleObject(datefeaturesObject)).toEqual(returnedObj);

		});

		it('should return parsed value for string "false" ',function() {

 			var datefeaturesObject = {
 				bool: 'false'
 			};
 			var returnedObj = { bool: false };
		  	expect(featureToggleParser.parseToggleObject(datefeaturesObject)).toEqual(returnedObj);

		});

		it('should return same object after date moment parsing if it contains date value',function() {

 			var objectType = {
 				bool: true,
 				dateObj: new Date()
 			};
 			var returnedObj = {
 				bool: true,
 				dateObj: moment(new Date()) 
 			};
		  	expect(featureToggleParser.parseToggleObject(objectType)).toEqual(returnedObj);

		});

		it('should delete key which is not valid',function() {

 			var objectType = {
 				Id: 4,
 				dateObj: new Date()
 			};
 			var returnedObj = {
 				
 			  dateObj: moment(new Date()) 
 			};
		  	expect(featureToggleParser.parseToggleObject(objectType)).toEqual(returnedObj);

		});

		it('should check for data in string format',function() {
			
 			var stringType = JSON.stringify({ dateStr: new Date().toString()});
 			var returnedObj = { dateStr: moment(new Date().toString()) };
		  	expect(featureToggleParser.parseToggleObject(stringType)).toEqual(returnedObj);

		});

		it('should return same object',function() {

		  	expect(featureToggleParser.parseToggleObject({ key: '' })).toEqual({ key: '' });

		});

	});

	 describe('parseConfigObject suite', function() {
	 	
		it('should merge the Config object and return true',function() {

 		var newConfig = {
 			enableDates: true
 		};
		  	expect(featureToggleParser.parseConfigObject(newConfig)).toEqual(newConfig);

		});

		it('should return false for invalid enableDates value',function() {

 		var newConfig = {
 			enableDates: 'new'
 		};
 		var returnedObj = {
 			enableDates: false
 		};
		  	expect(featureToggleParser.parseConfigObject(newConfig)).toEqual(returnedObj);

		});

		it('should check if enableDates is not defined',function() {

 		var newConfig = { };
 		
		  	expect(featureToggleParser.parseConfigObject(newConfig)).toEqual(newConfig);

		});
	});



});
