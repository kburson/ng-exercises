"use strict";

describe('featureToggleParser', function () {

  beforeEach(module('myApp.utilities'));

  var featureToggleParser;
  
  beforeEach(inject(function(_featureToggleParser_) {
  
      featureToggleParser = _featureToggleParser_;
  
  }));
  
  it('should featureToggleParser be defined', function() {
  
      expect(featureToggleParser).toBeDefined();
  
  });
  
  it('should featureToggleParser.parseConfigObject() be defined', function() {
  
      expect(featureToggleParser.parseConfigObject).toBeDefined();
  
  });
  
  it('should featureToggleParser.parseToggleObject() be defined', function() {
  
      expect(featureToggleParser.parseToggleObject).toBeDefined();
  
  });
  
  describe('parseConfigObject()', function() {
  
      var result, newConfig;
  
      it("should return false for enableDates when the parseConfigObject is called with enableDates as ['false', 'off', '0', 'no']", function() {
  
          newConfig = {
              "enableDates": 'no'
          };
  
          result = featureToggleParser.parseConfigObject(newConfig);
  
          expect(result.enableDates).toBeFalsy();
  
      });
  
      it("should return false for enableDates when the parseConfigObject is called with enableDates as random String", function() {
  
          newConfig = {
              "enableDates": "abc"
          };
  
          result = featureToggleParser.parseConfigObject(newConfig);
  
          expect(result.enableDates).toBeFalsy();
  
      });
  
      it("should return true for enableDates when the parseConfigObject is called with enableDates as ['true', 'on', '1', 'yes']", function() {
  
          newConfig = {
              "enableDates": 1
          };
  
          result = featureToggleParser.parseConfigObject(newConfig);
  
          expect(result.enableDates).toBeTruthy();
  
      });
  
      it('should return undefined for enableDates when the parseConfigObject is called with object without enableDates property', function() {
  
          newConfig = {
              "configSettings": "abc"
          };
  
          result = featureToggleParser.parseConfigObject(newConfig);
  
          expect(result.enableDates).toBeUndefined();
  
      });
  
      it('should return same object when the parseConfigObject is called with object without enableDates property', function() {
  
          newConfig = {
              "configSettings": "abc"
          };
  
          result = featureToggleParser.parseConfigObject(newConfig);
  
          expect(result.configSettings).toBe("abc");
  
      });
  
  });
  
  describe('parseToggleObject()', function() {
  
      var result, toggles, input, output;
      var emptyObject = {};
      var InvalidDate = "Invalid date";
  
      beforeEach(function() {
  
          input = {
              "flag1": false,
              "flag2": true,
              "flag3": "19911001",
              "flag4": "true",
              "flag5": 12312,
              "flag6": "2017-03-10",
              "flag7": "abc",
              "flag8": "1234567890",
              "flag9": "FALSE",
              "list": {
                  "fruit": [
                      "apples",
                      "bananas",
                      "grapefruit"
                  ]
              },
              "validObj": {
                  "isValid": true
              }
          };
  
          output = {
              "flag1": false,
              "flag2": true,
              "flag3": 'Tue Oct 01 1991 00:00:00 GMT+0530',
              "flag4": true,
              "flag6": 'Fri Mar 10 2017 00:00:00 GMT+0530',
              "flag9": false
          };
  
      });
  
      it('should return empty object on passing an empty JSON object', function() {
  
          toggles = {};
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing an empty string', function() {
  
          toggles = "";
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing an array', function() {
  
          toggles = [1, 2, 3, 4, 5];
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing a number', function() {
  
          toggles = 5;
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing a boolean value', function() {
  
          toggles = true;
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it("should test the returned property be 'moment' type when passing property as date string in `YYYYMMDD` format", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag3._isAMomentObject).toBeTruthy();
  
      });
  
      it("should test the returned property be 'moment' type when passing property as date string in `YYYY-MM-DD` format", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag6._isAMomentObject).toBeTruthy();
  
      });
  
      it("should test the returned property contains valid moment date string when passing property as date string in `YYYYMMDD` format", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag3.toString()).toBe(output.flag3);
  
      });
  
      it("should test the returned property contains valid moment date string when passing property as date string in `YYYY-MM-DD` format", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag6.toString()).toBe(output.flag6);
  
      });
  
      it("should test the property got deleted in returned object when passing property as an object having array as property value", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.hasOwnProperty('list')).toBeFalsy();
  
      });
  
      it("should test the property got deleted in returned object when passing property value as array", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.hasOwnProperty('fruit')).toBeFalsy();
  
      });
  
      it("should test the property got deleted in returned object when passing property value as number", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.hasOwnProperty('flag5')).toBeFalsy();
  
      });
  
      it("should test the boolean property is parsed in returned object when passing property value as boolean false", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag1).toBe(output.flag1);
  
      });
  
      it("should test the boolean property is parsed in returned object when passing property value as boolean true", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag2).toBe(output.flag2);
  
      });
  
      it("should test the string(lowercase) property is parsed into boolean in returned object when passing property value as `true`", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag4).toBe(output.flag4);
  
      });
  
      it("should test the string(UPPERCASE) property is parsed into boolean in returned object when passing property value as `FALSE`", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag9).toBe(output.flag9);
  
      });
  
      it("should test the property in returned object as invalid date when passing invalid date string in property value as `abc`", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag7.toString()).toBe(InvalidDate);
  
      });
  
      it("should test the property in returned object as invalid date when passing invalid date string in property value as `1234567890`", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag8.toString()).toBe(InvalidDate);
  
      });
  
      it("should test the returned object contains the object property when passing the property as object with valid properties", function() {
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.validObj.hasOwnProperty('isValid')).toBeTruthy();
  
      });
  
  });

});
