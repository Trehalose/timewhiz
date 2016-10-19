(function(){
  angular.module("TimeWhiz").controller("navController", ['authService', '$location', '$cookies', function(authService, $location, $cookies){
    var self = this;
    self.currentPath = $location.path();
    self.isLoggedIn = function(){ return authService.isLoggedIn();};
    self.getUserName = function(){
      var username = 'User';
      if(authService.currentUser() !== null){
        username = authService.currentUser().username;
      }
      return username;
    };
    self.logout = function(){
      authService.logout();
      $location.path('/');
    };
  }]);
})();
