(function(){
  angular.module("TimeWhiz").factory("authService", ['$http', '$window', function($http, $window){
    var setToken = function(token){
      $window.localStorage['timewhiz-token']=token;
    };
    var getToken = function(){
      return $window.localStorage['timewhiz-token'];
    };
    var register = function(user){
      return $http.post('./api/register', user)
      .success(function(data){
        setToken(data.token);
      });
    };
    var login = function(user){
      return $http.post('./api/login', user)
      .success(function(data){
        setToken(data.token);
      });
    };
    var logout = function(){
      $window.localStorage.removeItem('timewhiz-token');
    };
    var isLoggedIn = function(){
      var token = getToken();
      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now()/1000;
      }
      else{return false;}
    };
    var currentUser = function(){
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          username:payload.username,
          id: payload.id
        };
      }
      else{
        return null;
      }
    };
    return{setToken: setToken, getToken: getToken, register: register, login: login, logout: logout, isLoggedIn: isLoggedIn, currentUser: currentUser};
  }]);
})();
