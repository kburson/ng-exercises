"use strict";

describe('featureToggleService', function () {

  var lodash = _;

  beforeEach(module('myApp.services', function($provide){
  	$provide.value('API_URLS', 'config-featureToggle-link');
  }));

  it('should verify default toggles and config',inject(function(featureToggleService) {
  	expect(featureToggleService.getToggles()).toEqual({});
  	expect(featureToggleService.getConfig()).toEqual({
          enableDates: true, 
          hosts: {
            localhost: {
              enableAll: false,
              disableAll: false
            }
          }
        });
  }));

it('should be disable for any path default',inject(function(featureToggleService) {
  	expect(featureToggleService.isEnabled('rest.serviceA')).toBe(false);
  }));

it('should be disable for localhost',inject(function(featureToggleService,$location) {
	spyOn(featureToggleService.getToggleByPath).and.returnValue(true);
	spyOn($location.host).and.returnValue('localhost');
  	expect(featureToggleService.isEnabled('rest.serviceA')).toBe(false);
  }));

it('should be be enable in cat',inject(function(featureToggleService,$location) {
	spyOn(featureToggleService.getToggleByPath).and.returnValue(true);
	spyOn($location.host).and.returnValue('cat');
  	expect(featureToggleService.isEnabled('cat.rest.serviceA')).toBe(true);
  }));

it('should allow to load config from AJAX and verify enable for cat', inject(function(featureToggleService, $httpBackend){
	$httpBackend.whenGET('config-featureToggle-link').respond(200,{data:{config:{}, toggles:{cat:{rest:{serviceA:{enabled:true}}}, prod:{rest:{serviceA:{enabled:false}}}}}});
	featureToggleService.loadTogglesFromWebAPI();
	expect(featureToggleService.isEnabled('cat.rest.serviceA')).toBe(false);
	$httpBackend.flush();
	expect(featureToggleService.isEnabled('cat.rest.serviceA')).toBe(true);
}));


});

