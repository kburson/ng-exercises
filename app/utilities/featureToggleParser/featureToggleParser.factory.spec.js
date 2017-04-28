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
  
      it("should return false for enableDates when the parseConfigObject is called with enableDates as `no`", function() {
  
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
  
      it("should return true for enableDates when the parseConfigObject is called with enableDates as `1`", function() {
  
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
  
      var result, toggles, input, output, InvalidDate, emptyObject;
  
      it('should return empty object on passing an empty JSON object', function() {
  
          toggles = {};
          
          emptyObject = {};
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing an empty string', function() {
  
          toggles = "";
          
          emptyObject = {};
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing an array', function() {
  
          toggles = [1, 2, 3, 4, 5];
          
          emptyObject = {};
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing a number', function() {
  
          toggles = 5;
          
          emptyObject = {};
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it('should return empty object on passing a boolean value', function() {
  
          toggles = true;
          
          emptyObject = {};
  
          result = featureToggleParser.parseToggleObject(toggles);
  
          expect(result).toEqual(emptyObject);
  
      });
  
      it("should parse the date string property in `YYYYMMDD` format into a moment object", function() {
  
          input = {
              "flag3": "19911001"
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag3._isAMomentObject).toBeTruthy();
  
      });
  
      it("should parse the date string property in `YYYY-MM-DD` format into a moment object", function() {
  
          input = {
              "flag6": "2017-03-10"
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag6._isAMomentObject).toBeTruthy();
  
      });
  
      it("should test the date string in `YYYYMMDD` format parsed to moment date string", function() {
        
          input = {
              "flag3": "19911001"
          };
          
          output = {
              "flag3": 'Tue Oct 01 1991 00:00:00 GMT+0530'
          };
  
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag3.toString()).toBe(output.flag3);
  
      });
  
      it("should test the date string in `YYYY-MM-DD` format parsed to moment date string", function() {
  
          input = {
              "flag6": "2017-03-10"
          };
  
          output = {
              "flag6": 'Fri Mar 10 2017 00:00:00 GMT+0530'
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag6.toString()).toBe(output.flag6);
  
      });
  
      it("should test object having array as property value is deleted in returned object", function() {
          
          input = {
              "list": {
                  "fruit": [
                      "apples",
                      "bananas",
                      "grapefruit"
                  ]
              }
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.hasOwnProperty('list')).toBeFalsy();
          
          expect(result.hasOwnProperty('fruit')).toBeFalsy();
  
      });
  
      it("should test object having number as property value is deleted in returned object", function() {
  
          input = {
              "flag5": 12312
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.hasOwnProperty('flag5')).toBeFalsy();
  
      });
  
      it("should test the boolean[false] property is parsed into boolean false in returned object", function() {
  
          input = {
              "flag1": false
          };
          
          output = {
              "flag1": false
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag1).toBe(output.flag1);
  
      });
  
      it("should test the boolean[true] property is parsed into boolean true in returned object", function() {
  
          input = {
              "flag2": true
          };
          
          output = {
              "flag2": true
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag2).toBe(output.flag2);
  
      });
  
      it("should parse the string(lowercase) property as `true` into boolean true", function() {
  
          input = {
              "flag4": "true"
          };
          
          output = {
              "flag4": true
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag4).toBe(output.flag4);
  
      });
  
      it("should parse the string(lowercase) property as `FALSE` into boolean false", function() {
  
          input = {
              "flag9": "FALSE"
          };
          
          output = {
              "flag9": false
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag9).toBe(output.flag9);
  
      });
  
      it("should return `Invalid date` when passing random string as property value `abc`", function() {
  
          input = {
              "flag7": "abc"
          };
          
          InvalidDate = "Invalid date";
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag7.toString()).toBe(InvalidDate);
  
      });
  
      it("should return `Invalid date` when passing random string as property value `1234567890`", function() {
  
          input = {
              "flag8": "1234567890"
          };
          
          InvalidDate = "Invalid date";
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.flag8.toString()).toBe(InvalidDate);
  
      });
  
      it("should return parsed object when passing object with valid properties", function() {
  
          input = {
              "validObj": {
                      "isValid": true
                  }
          };
          
          result = featureToggleParser.parseToggleObject(input);
  
          expect(result.validObj.hasOwnProperty('isValid')).toBeTruthy();
  
      });
  
  });

});
