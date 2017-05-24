
"use strict";

describe('romanNumeralTranslatorService', function() {

  beforeEach(module('myApp.components.romanNumbers'));

  var service;
  var mapping;

  beforeEach(inject(function(_romanNumeralTranslatorService_) {
    service = _romanNumeralTranslatorService_;
  }));

  describe('function: translate',function(){

    describe('Tests for breakpoints', function() {

      mapping = {
        '50' : 'L',
        '90' : 'XC',
        '100': 'C',
        '400': 'CD',
        '490': 'XD',
        '500': 'D',
        '900': 'CM',
        '1000': 'M',
        '3888': 'MMMDCCCLXXXVIII'
      };

      function checkIt(output, input){
        it('should return Roman Number ' + output + ' when input is a number with value ' + input, function(){
          var returnValue = service.translate(input);
          expect(returnValue).toEqual(output);      
        });
      }

      angular.forEach(mapping, function(output, input){
        checkIt(output, input);
      });

    });

    it('should return Roman Number XII when input is a string with value 12', function() {
      var returnValue = service.translate('12');
      expect(returnValue).toEqual('XII');
    });

    it('should not return anything when input is a number with value -2 which is less than 0', function() {
      var returnValue = service.translate(-2);
      expect(returnValue).toEqual('');
    });

    it('should return Roman Number I when input is a number with value 1 which is less than 11 and greater than 0', function() {
      var returnValue = service.translate(1);
      expect(returnValue).toEqual('I');
    });

    it('should return Roman Number XII when input is a number with value 12 which is less than 40 and greater than 10', function() {
      var returnValue = service.translate(12);
      expect(returnValue).toEqual('XII');
    });

    it('should return Roman Number XLV when input is a number with value 45 which is less than 50 greater than 39', function() {
      var returnValue = service.translate(45);
      expect(returnValue).toEqual('XLV');
    });

    it('should return Roman Number LXXV when input is a number with value 75 which is less than 90 and greater than 49', function() {
      var returnValue = service.translate(75);
      expect(returnValue).toEqual('LXXV');
    });

    it('should return Roman Number XCV when input is a number with value 95 which is less than 100 and greater than 89', function() {
      var returnValue = service.translate(95);
      expect(returnValue).toEqual('XCV');
    });

    it('should return Roman Number CCCXCV when input is a number with value 395 which is less than 400 and greater than 99', function() {
      var returnValue = service.translate(395);
      expect(returnValue).toEqual('CCCXCV');
    });

    it('should return Roman Number CDL when input is a number with value 450 which is less than 490 and greater than 399', function() {
      var returnValue = service.translate(450);
      expect(returnValue).toEqual('CDL');
    });

    it('should return Roman Number XDV when input is a number with value 495 which is less than 500 and greater than 489', function() {
      var returnValue = service.translate(495);
      expect(returnValue).toEqual('XDV');
    });

    it('should return Roman Number DCXCV when input is a number with value 695 which is less than 900 and greater than 499', function() {
      var returnValue = service.translate(695);
      expect(returnValue).toEqual('DCXCV');
    });

    it('should return Roman Number CMXCV when input is a number with value 995 which is less than 1000 and greater than 899', function() {
      var returnValue = service.translate(995);
      expect(returnValue).toEqual('CMXCV');
    });

    it('should return Roman Number MXCV when input is a number with value 1095 which is less than 3888 greater than 999', function() {
      var returnValue = service.translate(1095);
      expect(returnValue).toEqual('MXCV');
    });

    it('should throw an error when value is greater than 3888', function() {
      expect(function(){service.translate(3990)}).toThrow(new Error('invalid number, max value = 3888'));
    });

  });
  
});