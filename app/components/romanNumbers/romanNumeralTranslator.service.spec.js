describe('romanNumeralTranslatorService', function() {
    "use strict";

    beforeEach(module('myApp.components.romanNumbers'));

    var service, decimal, result;

    beforeEach(inject(function(romanNumeralTranslatorService) {
        service = romanNumeralTranslatorService;
    }));
    //NOTE:testing for random decimal values for each range
    describe('translate()', function() {
        it('should convert a string to integer and then convert it to roman numeral', function() {
            decimal = '9';
            result = 'IX';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should return empty string if decimal is less than 0', function() {
            decimal = -1;
            result = '';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 8 to VIII(for input less than 11)', function() {
            decimal = 8;
            result = 'VIII';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 31 to XXXI(for input less than 40)', function() {
            decimal = 31;
            result = 'XXXI';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 43 to XLIII(for input less than 50)', function() {
            decimal = 43;
            result = 'XLIII';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 74 to LXXIV(for input less than 90)', function() {
            decimal = 74;
            result = 'LXXIV';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 90 to XC(for input less than 100)', function() {
            decimal = 90;
            result = 'XC';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 369 to CCCLXIX(for input less than 400)', function() {
            decimal = 369;
            result = 'CCCLXIX';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 415 to CDXV(for input less than 490)', function() {
            decimal = 415;
            result = 'CDXV';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 497 to XDVII(for input less than 500)', function() {
            decimal = 497;
            result = 'XDVII';
            expect(service.translate(decimal)).toBe(result);
        });

        it('should convert 789 to DCCLXXXIX(for input less than 900)', function() {
            decimal = 789;
            result = 'DCCLXXXIX';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should convert 999 to CMXCIX(for input less than 1000)', function() {
            decimal = 999;
            result = 'CMXCIX';
            expect(service.translate(decimal)).toEqual(result);
        });

        it('should throw an error for input value 4000(if decimal is greater than 3888)', function() {
            decimal = 4000;
            expect(function() { service.translate(decimal) }).toThrow(new Error('invalid number, max value = 3888'));
        });

        it('should convert 1999 to MCMXCIX(for input less than 3888)', function() {
            decimal = 1999;
            result = 'MCMXCIX';
            expect(service.translate(decimal)).toEqual(result);
        });

    });

});