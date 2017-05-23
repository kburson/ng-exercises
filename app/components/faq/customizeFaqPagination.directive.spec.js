describe("customizeFaqPagination", function(){
  var $scope,compile,element;
   beforeEach(module('myApp.components.faq'));
   beforeEach(inject(function($rootScope,_$compile_) {
        $scope = $rootScope.$new();
        compile = _$compile_;
      
        var htmlElement = angular.element('<div customise-faq-pagination></div>');
        element = compile(htmlElement)($scope);
        $scope.$digest();
   }));


var timerMethod, $timeout;

    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        timerMethod = jasmine.createSpy('bindClickEvent');
    }));

  it('should test directive HTML', function () {
         expect(element[0].outerHTML).toBe('<div customise-faq-pagination="" class="ng-scope"></div>');
   });

    it("should test timeout 'bindClickEvent' to be called synchronously", function() {
        $timeout(function() {
            timerMethod();
        }, 1000);
        expect(timerMethod).not.toHaveBeenCalled();
        $timeout.flush();
        expect(timerMethod).toHaveBeenCalled();
    });
});
