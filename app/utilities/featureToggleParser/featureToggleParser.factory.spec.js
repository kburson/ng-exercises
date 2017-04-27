"use strict";

describe('featureToggleParser', function () {

  var featureToggleParser;

  // Dummy Toggle Object
  var dummyToggleObj = {
    "trueValBooleanCheck": "true",
    "falseValBooleanCheck": "false",
    "validDateStringCheck": new Date(),
    "validDateObjCheck": "2017 - 04 - 08 T07: 12: 40.802 Z",
    "invalidDateCheck": "This is Invalid Date",
    "validMomentObjCheck": moment(),
    "arrayOfRandValues": ["String ", 1, false, null, {}],
    "nestedObject": {
      "nestedArray": ["1", "2", "3"]
    }
  };

  var dummyJSONToggleObj = JSON.parse(JSON.stringify(dummyToggleObj));
  var dummyJSONToggleString = JSON.stringify(dummyJSONToggleObj);


  // Dummy Config Object
  var configObject = {
    trueBoolValues: ['true', 'on', '1', 'yes'],
    falseBoolValues: ['false', 'off', '0', 'no']
  };

  beforeEach(module('myApp.utilities'));
  beforeEach(inject(function (_featureToggleParser_) {
    featureToggleParser = _featureToggleParser_;
  }));

  it('should define a factory',function() {
    expect(featureToggleParser).toBeDefined();
  });


  /** ******* Beginning of Tests for 'parseToggleObject' method ******* **/
  describe ('parseToggleObject', function () {
    it('should return an empty Object for all inputs other than JSON string or JSON Object ', function () {
      // empty string
      expect(featureToggleParser.parseToggleObject('')).toEqual({});
      // numbers
      expect(featureToggleParser.parseToggleObject(2)).toEqual({});
      // empty array
      expect(featureToggleParser.parseToggleObject([])).toEqual({});
      // for non-empty array
      expect(featureToggleParser.parseToggleObject([1, 2, 3])).toEqual({});
      // for boolean
      expect(featureToggleParser.parseToggleObject(false)).toEqual({});

    });

    it('should return JSON Object for JSON string and JSON Object', function () {
      var parsedJSON;
      // For JSON Input
      spyOn(angular, 'copy').and.callThrough();
      spyOn(angular, 'fromJson').and.callThrough();
      parsedJSON = featureToggleParser.parseToggleObject(dummyJSONToggleObj);
      expect(parsedJSON).toBeTruthy();
      expect(!_.isEmpty(parsedJSON)).toBeTruthy();

      // For JSON String Input
      parsedJSON = featureToggleParser.parseToggleObject(dummyJSONToggleString);
      expect(parsedJSON).toBeTruthy();
      expect(angular.fromJson).toHaveBeenCalled();
      expect(!_.isEmpty(parsedJSON)).toBeTruthy();
    });

    it('should trim out all the props from JSON object other than date and boolean values', function() {
      var parsedObject = featureToggleParser.parseToggleObject(dummyJSONToggleObj);
      // check invalid props been removed form the JSON
      expect(parsedObject.arrayOfRandValues).toBeUndefined();
      expect(parsedObject.nestedObject).toBeUndefined();

      // Though its invalid date it will be defined because of (typo in (?)) code
      expect(parsedObject.invalidDateCheck).toBeDefined();
      expect(parsedObject.validDateObjCheck).toBeDefined();
      expect(parsedObject.validMomentObjCheck).toBeDefined();
      expect(parsedObject.trueValBooleanCheck).toBeDefined();
      expect(parsedObject.falseValBooleanCheck).toBeDefined();
      expect(parsedObject.validDateStringCheck).toBeDefined();
    });
  });


  describe('parseConfigObject', function() {
    it('should return an empty Object for primitive inputs and an object for arrays and non-empty strings', function() {
      // empty string input
      expect(featureToggleParser.parseConfigObject('')).toEqual({});
      // number input
      expect(featureToggleParser.parseConfigObject(1)).toEqual({});
      // boolean input
      expect(featureToggleParser.parseConfigObject(false)).toEqual({});
      // undefined input
      expect(featureToggleParser.parseConfigObject(undefined)).toEqual({});
      // array input
      expect(featureToggleParser.parseConfigObject(['foo', 'bar'])).toEqual({ 0: 'foo', 1: 'bar' });
      // non empty string input
      expect(featureToggleParser.parseConfigObject('foo')).toEqual({ 0: 'f', 1: 'o', 2: 'o' });
    });

    it('should return the Object with same prop values if it doesnt have enableDates property or its undefined', function() {
      // empty string input
      expect(featureToggleParser.parseConfigObject({ a: '1', b: 2 })).toEqual({ a: '1', b: 2 });
      expect(featureToggleParser.parseConfigObject({ enableDates: undefined })).toEqual({ enableDates: undefined });
    });

    it('should convert valid prop values into boolean values', function() {
      // for true boolean values
      _.forEach(configObject.trueBoolValues, function(val) {
        expect(featureToggleParser.parseConfigObject({ enableDates: val })).toEqual({ enableDates: true });
      });

      // for false boolean values
      _.forEach(configObject.falseBoolValues, function(val) {
        expect(featureToggleParser.parseConfigObject({ enableDates: val })).toEqual({ enableDates: false });
      });
    });
  });
});
