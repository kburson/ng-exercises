
'use strict';

describe('RomanNumbersController', function () {

    beforeEach(module('myApp.components.romanNumbers'));

    var RomanNumbersController, $scope, romanNumeralTranslatorService, $event;

    beforeEach(inject(function ($rootScope, $controller, _romanNumeralTranslatorService_) {
        $scope = $rootScope.$new();

        RomanNumbersController = $controller('RomanNumbersController', {
            $scope: $scope
        });

        romanNumeralTranslatorService = _romanNumeralTranslatorService_;

    }));

    describe('translate Function', function () {

        it("should set romanInteger to empty string if decimalInteger is empty", function () {
            RomanNumbersController.translate();

            expect(RomanNumbersController.romanInteger).toBe('');
        });

        it("should check if decimalInteger is having some value and should assign equivalent roman value with romanInteger", function () {

            spyOn(romanNumeralTranslatorService, 'translate').and.callThrough();
            RomanNumbersController.decimalInteger = '10';
            RomanNumbersController.translate();
            expect(RomanNumbersController.romanInteger).toEqual('X');
        });

        it("should slice the unit value if decimal integer is >3888", function () {

            spyOn(romanNumeralTranslatorService, 'translate').and.callFake(function () {
                throw new Error('Number is greater than 3888');
            });
            spyOn(console, 'log');
            RomanNumbersController.decimalInteger = '3888';
            RomanNumbersController.translate();
            expect(RomanNumbersController.decimalInteger).toEqual('388');
        });
    });

    describe('validate Function', function () {
        it('should call $event.preventDefault', function () {
            $event = new Event('keyPress');
            spyOn($event, 'preventDefault');

            $event.key = 12;
            RomanNumbersController.validate($event);
            expect($event.preventDefault).toHaveBeenCalled();
        });

        it('should log console with $event', function () {
            $event.key = 5;

            spyOn(console, 'log');
            RomanNumbersController.validate($event);
            expect(console.log).toHaveBeenCalledWith($event);

        });
    });
});