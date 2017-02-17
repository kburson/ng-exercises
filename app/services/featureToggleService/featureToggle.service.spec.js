"use strict";

describe('featureToggleService', function () {

  var lodash = _;

  var featureToggleService;

  var defaultConfig = {
      enableDates: true, 
      hosts: {
        localhost: {
          enableAll: false,
          disableAll: false 
        }
      }
    };

  // Before each test load our api.users module
  beforeEach(angular.mock.module('myApp.services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_featureToggleService_) {
    featureToggleService = _featureToggleService_;
  }));

  it('should exist',function() {
    // A simple test to verify the Users factory exists
    expect(featureToggleService).toBeDefined();
  });

  // A set of tests for our config settings
  describe('config default value and setting new', function() {
    // A simple test to verify the method all exists
    it('getConfig should be defined', function() {
      expect(featureToggleService.getConfig).toBeDefined();
    });

    // getConfig should return the default value set
    it('testing getConfig default value', function() {
      expect(featureToggleService.getConfig()).toEqual(defaultConfig);
    });

    // setting enableDates from true to false
    it('setting enableDates from true to false', function() {
      featureToggleService.setConfig({
        enableDates: false
      });
      expect(featureToggleService.getConfig().enableDates).toBeFalsy();
    });

    // setting enableDates from true to false
    it('setting enableAll from false to true', function() {
      featureToggleService.setConfig({
        localhost: {
          enableAll: true
        }
      });
      expect(featureToggleService.getConfig().localhost.enableAll).toBeTruthy();
    });
  });

  // A set of tests for our toggle settings
  describe('toggle default value and setting new', function() {
    // A simple test to verify the method all exists
    it('getToggles should be defined', function() {
      expect(featureToggleService.getToggles).toBeDefined();
    });

    // getConfig should return the default value set
    it('testing getToggles default value should be empty object', function() {
      expect(featureToggleService.getToggles()).toEqual({});
    });

    // testing default isEnabled property
    it('testing isEnabled is exists', function() {
      expect(featureToggleService.isEnabled()).toBeDefined();
    });
  });

});

