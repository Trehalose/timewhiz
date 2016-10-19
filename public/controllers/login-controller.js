(function(){
  angular.module('TimeWhiz').controller('loginController',['$http', '$location', 'authService', function($http, $location, authService){
    var self = this
    self.user = user;
    self.pageTo = $location.search().page || '/';
    self.submitForm = function(){
      if(!self.user.username || !self.user.password){
        console.log("You didn't fill out all required fields yet. Try again!");
      }
      else{
        self.user.username = self.user.username.toLowerCase();
        authService.login(self.user)
        .error(function(err){console.log(err);})
        .then(function(){
          self.resetForm();
          $location.search('page', null);
          $location.path('/');
        });
      }
    };
    self.resetForm = function(){
      self.user.username = undefined;
      self.user.password = undefined;
    };
  }]);
  var user = {
    username: undefined,
    password: undefined
  };
})();
