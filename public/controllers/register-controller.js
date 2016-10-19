(function(){
  angular.module('TimeWhiz').controller('registerController', ['$http', '$location', 'authService', function($http, $location, authService){
    var self = this;
    self.newUser = newUser;
    self.pageTo = $location.search().page || '/';
    self.submitForm = function(){
      if(!self.newUser.fullname || !self.newUser.username || !self.newUser.password || !self.newUser.termsAgree){
        console.log("You didnt fill all required fields yet. Try again!");
      }
      else{
        self.newUser.username = self.newUser.username.toLowerCase();
        authService.register(self.newUser)
        .error(function(err){console.log(err);})
        .then(function(){
          self.resetForm();
          $location.search('page', null);
          $location.path('/');
        });
      }
    };
    self.resetForm = function(){
      self.newUser.fullname = undefined;
      self.newUser.username = undefined;
      self.newUser.password = undefined;
      self.newUser.termsAgree = false;
    };
  }]);
  var newUser = {
    fullname: undefined,
    username: undefined,
    password: undefined,
    termsAgree: false
  };
})();
