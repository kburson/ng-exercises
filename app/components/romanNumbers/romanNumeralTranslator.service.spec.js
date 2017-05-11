describe('romanNumeralTranslatorService', function () {
    "use strict";

    beforeEach(module('myApp.components.romanNumbers'));

    var service;

    beforeEach(inject(function (romanNumeralTranslatorService) {

        service = romanNumeralTranslatorService;
    }));

    it('should exist', function () {
        expect(service).toBeDefined()
    });

    it('Testing romanNumeralTranslator function for int value', function () {
        // Arrange Data
        var decimal = 10;
        //Act
        var result = service.translate(decimal);
        // Assert
        expect(result).toEqual('X');
    });

    it('Testing romanNumeralTranslator function for string  value ', function () {
        // Arrange Data
        var decimal = "2";
        //Act
        var result = service.translate(decimal);
        //Assert
        expect(result).toEqual('II');
    });


});