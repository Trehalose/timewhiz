(function(){
  var config = function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController',
      controllerAs: 'homeCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController',
      controllerAs: 'registerCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
      controllerAs: 'loginCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/whizard.html',
      controller: 'whizardController',
      controllerAs: 'whizCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  };
  angular.module("TimeWhiz").config(['$routeProvider', '$locationProvider', config]);
})();
