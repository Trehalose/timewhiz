(function(){
  angular.module('TimeWhiz').controller('timerController',['$http', '$location', 'authService', function($http, $location, authService){
    var self = this;
    self.bigButton = "BRB!";
    self.brb = brb;
    self.isLoggedIn = function(){return authService.isLoggedIn();};
    self.timer = timer;
    self.timer.checkTimed = function(){
      if(self.timer.timed === true){return true;}
      else{return false;}
    };
    self.timer.checkTiming = function(){
      if(self.timer.timing === true){return true;}
      else{return false;}
    };
    self.timer.clearTimer = function(){
      self.timer.timed = false;
      self.timer.timing = false;
      self.brb.startTime = undefined;
      self.brb.endTime = undefined;
      self.brb.duration = undefined;
      self.brb.activities.pee = false;
      self.brb.activities.poo = false;
      self.brb.activities.puke = false;
      self.brb.activities.makeup = false;
      self.brb.activities.escape = false;
      self.brb.activities.fetish = false;
    };
    self.buttonPress = function(){
      if(self.timer.checkTiming()){
        self.endTimer();
      }
      else{
        self.startTimer();
      }
    };
    self.startTimer = function(){
      self.brb.startTime = new Date();
      self.timer.timing = true;
      self.timer.bigButton = "~DONE~";
    };
    self.endTimer = function(){
      self.brb.endTime = new Date();
      self.timer.timing = false;
      self.brb.duration = self.calculateBRBDuration();
      self.timer.timed = true;
      self.timer.bigButton = "BRB!";
    };
    self.calculateBRBDuration = function(){
      return (self.brb.endTime.getTime() - self.brb.startTime.getTime());
    };
    self.submittable = function(){
      return authService.currentUser() !== null;
    }
    self.logTime = function(){
      if(authService.currentUser() === null){
        console.log("You ain't signed in, yo!");
      }
      else{
        self.brb.userRef = authService.currentUser().id;
        /*if(self.brb.activities.pee === false && self.brb.activities.poo === false && self.brb.activities.puke === false && self.brb.activities.makeup === false && self.brb.activities.escape === false && self.brb.activities.fetish === false){
          self.brb.activities.escape === true;
        }*/
        $http.post('./api/brbs', self.brb, {
          headers: {
            Authorization: 'Bearer ' + authService.getToken()
          }
        })
        .success(function(data){
          self.timer.clearTimer();
        })
        .error(function(err){console.log(err);});
      }
    };
  }]);
  var brb = {
    userRef: undefined,
    startTime: undefined,
    endTime: undefined,
    duration: undefined,
    activities: {
      poo: false,
      pee: false,
      puke: false,
      makeup: false,
      escape: false,
      fetish: false
    },
  };
  var timer = {
    bigButton: "BRB!",
    timing: false,
    timed: false
  };
})();
