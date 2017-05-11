'use strict';
describe('RomanNumberController', function () {

    // Include Module
    beforeEach(angular.mock.module('myApp.components.romanNumbers'));

    // Instantiate global variables  to all tests in this describe block.
    var $controller, romanNumeralTranslatorService;
    var romanNumberController;
    var $scope;

    // Inject dependencies
    beforeEach(angular.mock.inject(function (_$controller_, $rootScope, _romanNumeralTranslatorService_) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        romanNumberController = $controller('RomanNumbersController', {
            $scope: $scope
        });
        romanNumeralTranslatorService = _romanNumeralTranslatorService_;
    }));

    // Suite for testing an individual piece of our feature.
    describe('Testing RomanNumberController ', function () {

        it('should set romanInteger as empty when decimalInteger is null', function () {

            // Arrange
            romanNumberController.decimalInteger = null;
            //Act : for Null value we no need to spy on the service
            romanNumberController.translate();
            //Assert
            expect(romanNumberController.romanInteger).toEqual('');
        });

        it('should set romanInteger with value returned by translate', function () {

            //  Mock implementation of romanNumeralTranslatorService.translate()
            spyOn(romanNumeralTranslatorService, 'translate').and.returnValue('X');
            romanNumberController.decimalInteger = "10";
            // Act
            romanNumberController.translate();
            // Assert
            expect(romanNumberController.romanInteger).toEqual('X');
        });

        it('should call preventDefault of validate for each key stroke event is not numeric', function () {

            // Arrange
            var event = {
                "key": '-', "preventDefault": function () {
                }
            };
            //  Mock implementation of event
            spyOn(event, 'preventDefault');
            // Act
            romanNumberController.validate(event);
            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should not call preventDefault of validate for each key stroke event is  numeric', function () {

            // Arrange
            var event = {
                "key": '5', "preventDefault": function () {
                }
            };
            //  Mock implementation of event
            spyOn(event, 'preventDefault');
            // Act
            romanNumberController.validate(event);
            // Assert
            expect(event.preventDefault).not.toHaveBeenCalled();
        });
    });
});

