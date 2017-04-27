"use strict";

describe('featureToggleService', function() {

    var $log, $httpBackend, featureToggleService, API_URLS;
    var toggles = {
        print: true,
        clone: false,
        event: {
            cut: true,
            paste: false
        }
    };
    var config = {
        enableDates: true,
        hosts: {
            localhost: {
                enableAll: false,
                disableAll: false
            }
        }
    };
    var urls = {
        'featureToggles': 'http://localhost:123'
    };


    var data = '{ "toggles": { "print": true, "clone": false, "event": { "cut": true, "paste": false } }, "config": { "enableDates": true, "hosts": { "localhost": { "enableAll": false, "disableAll": false } } } }';
    var invalidData = '{ "toggles": { "print": true, "clone": false, "event" { "cut": true, "paste": false } }, "config": { "enableDates": true, "hosts" { "localhost": { "enableAll": false, "disableAll": false } } } }';

    beforeEach(function() {
        module('myApp.services');

        module(function($provide) {
            $provide.constant('API_URLS', urls);
        });

    });

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _featureToggleService_, _$log_, _$location_, _API_URLS_) {
        featureToggleService = _featureToggleService_;
        $log = _$log_;
        $httpBackend = _$httpBackend_;
        API_URLS = _API_URLS_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('featureToggleService', function() {
        it('featureToggleService should exist', function() {

            expect(featureToggleService).toBeDefined();
        });
    });

    describe('getToggleByPath', function() {
        it('should get toggle value by path', function() {
            featureToggleService.setToggles(toggles);

            expect(featureToggleService.getToggleByPath('event.cut')).toBe(true);
        });
    });

    describe('getConfig', function() {
        it('should return config values', function() {
            featureToggleService.setConfig(config);

            expect(featureToggleService.getConfig()).toEqual(config);
        });
    });

    describe('getToggles', function() {
        it('should return toggle values', function() {
            featureToggleService.setToggles(toggles);

            expect(featureToggleService.getToggles()).toEqual(toggles);
        });
    });

    describe('updateConfig', function() {
        it('should update config values', function() {
            var configToBeMerged = {
                print: true,
                clone: false,
                event: {
                    cut: true,
                    paste: false
                }
            };

            var response = {
                event: {
                    cut: true,
                    paste: false
                },
                clone: false,
                enableDates: true,
                hosts: {
                    localhost: {
                        disableAll: false,
                        enableAll: false
                    }
                },
                print: true
            };
            featureToggleService.setConfig(config);
            featureToggleService.updateConfig(configToBeMerged);

            expect(featureToggleService.getConfig()).toEqual(response);
        });
    });

    describe('updateToggles', function() {
        it('should update toggle values', function() {
            var toggleToBeMerged = {
                enableDates: true,
                hosts: {
                    localhost: {
                        enableAll: false,
                        disableAll: false
                    }
                }
            };

            var response = {
                event: {
                    cut: true,
                    paste: false
                },
                clone: false,
                enableDates: true,
                hosts: {
                    localhost: {
                        disableAll: false,
                        enableAll: false
                    }
                },
                print: true
            };
            featureToggleService.setToggles(toggles);
            featureToggleService.updateToggles(toggleToBeMerged);

            expect(featureToggleService.getToggles()).toEqual(response);
        });
    });

    describe('configure', function() {

        it('should check if the passed parameter is in valid string format', function() {
            featureToggleService.configure(data);
            expect(featureToggleService.getToggles()).toEqual(toggles);
            expect(featureToggleService.getConfig()).toEqual(config);
        });

        it('should check and set config and toggle when valid data is available', function() {
            var data = { "toggles": { "print": true, "clone": false, "event": { "cut": true, "paste": false } }, "config": { "enableDates": true, "hosts": { "localhost": { "enableAll": false, "disableAll": false } } } };
            featureToggleService.configure(data);
            expect(featureToggleService.getToggles()).toEqual(toggles);
            expect(featureToggleService.getConfig()).toEqual(config);
        });

        it('should check if the json is in invalid string format', function() {
            featureToggleService.configure(invalidData);
            expect($log.error.logs[0]).toContain('invalid json argument');
        });

    });

    describe('isEnabled', function() {

        it('should return false if the path given is incorrect', function() {
            expect(featureToggleService.isEnabled('event.copy')).toBeFalse();
        });

        it('should  return false if the path given is correct and disableAll is true', function() {

            var config = {
                enableDates: true,
                hosts: {
                    server: {
                        enableAll: true,
                        disableAll: true
                    }
                }
            };
            featureToggleService.setConfig(config);
            featureToggleService.setToggles(toggles);
            expect(featureToggleService.isEnabled('event.cut')).toBeFalse();
        });

        it('should return true if the path given is correct and enableAll is true', function() {
            var config = {
                enableDates: true,
                hosts: {
                    server: {
                        enableAll: true,
                        disableAll: false
                    }
                }
            };
            featureToggleService.setConfig(config);
            featureToggleService.setToggles(toggles);
            expect(featureToggleService.isEnabled('event.cut')).toBeTruthy();
        });

        it('should  return true if the path given is correct and enableAll,disableAll is false', function() {
            var config = {
                enableDates: true,
                hosts: {
                    server: {
                        enableAll: false,
                        disableAll: false
                    }
                }
            };

            var toggles = {
                print: true,

                clone: false,
                event: {
                    cut: true,
                    paste: false,
                    enabled: true,
                }
            };
            featureToggleService.setConfig(config);
            featureToggleService.setToggles(toggles);

            expect(featureToggleService.isEnabled('event')).toBeTruthy();
        });

        it('should return true if enableAll,disableAll is false and toggle enable feature is false', function() {
            var config = {
                enableDates: true,
                hosts: {
                    server: {
                        enableAll: false,
                        disableAll: false
                    }
                }
            };

            var toggles = {
                print: true,
                clone: false,
                event: {
                    cut: true,
                    paste: false,
                    enabled: false,
                    enableAfterDate: new Date(1995, 12, 20)
                }
            };
            featureToggleService.setConfig(config);
            featureToggleService.setToggles(toggles);
            expect(featureToggleService.isEnabled('event')).toBeTruthy();
        });

    });

    describe('loadToggles', function() {
        var responseConfig = {
            "enableDates": true,
            "hosts": {
                "localhost": {
                    "enableAll": false,
                    "disableAll": false
                }
            }
        };
        var responseToggles = {
            print: true,
            clone: false,
            event: {
                cut: true,
                paste: false
            }
        };

        it('should set config values after http response', function() {
            $httpBackend.expect('GET', urls.featureToggles).respond(200, data);
            featureToggleService.loadTogglesFromWebAPI();
            $httpBackend.flush();
            expect(featureToggleService.getConfig()).toEqual(responseConfig);
        });

        it('should set toggle values after http response', function() {
            $httpBackend.expect('GET', urls.featureToggles).respond(200, data);
            featureToggleService.loadTogglesFromWebAPI();
            $httpBackend.flush();
            expect(featureToggleService.getToggles()).toEqual(responseToggles);

        });

        it('should return undefined for empty url', function() {
            urls.featureToggles = null;
            expect(featureToggleService.loadTogglesFromWebAPI()).toBeUndefined();
        });

    });

});