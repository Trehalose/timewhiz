(function(){
  angular.module("TimeWhiz").directive("timer", function(){
    return {
      templateUrl: '../parts/timer.html',
      controller: 'timerController',
      controllerAs: 'timerCtrl',
      scope: {},
      link: function(scope, element, attr, timerCtrl){}
    };
  });
})();
