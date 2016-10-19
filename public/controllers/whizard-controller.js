(function(){
  angular.module("TimeWhiz").controller("whizardController",['$http', '$location', 'authService', 'brbService', function($http, $location, authService, brbService){
    var self = this;
    self.whizard = whizard;
    self.avgBrbs = new Array();
    self.loggedIn = function(){return authService.isLoggedIn();};
    self.curUser = authService.currentUser();
    if(!self.loggedIn() || self.curUser === null){
      console.log("You need to Log in or register first");
      $location.search('page', null);
      $location.path('/login');
    }
    else{
      $http.get("./api/users/" + self.curUser.id, {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      })
      .success(function(data){
        self.whizard.username = data.username;
        self.whizard.fullname = data.fullname;
        //self.whizard.brbs = data.brbs;
      })
      .error(function(err){
        console.log(err);
      });
    }
    self.brbsToday = brbService.getTodaysBrbs(self.curUser.id);
    brbService.getWhizardBrbs(self.curUser.id)
      .success(function(brbs){
        self.whizard.brbs = brbs;
        self.setBrbTimespans();
      })
      .error(function(err){
        console.log(err);
      });
    brbService.getAllBrbs()
      .success(function(brbs){
        var sortedBrbs = brbService.sortBrbsForTime(brbs);
        var avgedBrbs = brbService.avgAllBrbs(sortedBrbs);
        self.avgBrbs =  avgedBrbs;
        self.setBrbTimespans();
      })
      .error(function(err){
        console.log(err);
      });
    self.displayableBrbs = {
      whizard: "sput",
      avg: "sput"
    };
    self.timespan = {
      min: new Date(new Date()-(30*24*60*60*1000)), //SET DATE TO DAY OF LAUNCH
      max: new Date(new Date()+(24*60*60*1000))
    };
    self.getBrbTimespans = function(timespan, brbSet){
      //TODO: RETURN BRBS THAT ARE ABOVE timespan.min & BELOW timespan.max
      var newSet = new Array();
      for(var i = 0; i < brbSet.length; i++){
        var brbDate = new Date(brbSet[i].startTime);
        if(brbDate.getTime() >= timespan.min.getTime() && brbDate.getTime() <= timespan.max.getTime()){
          newSet.push(brbSet[i]);
        }
      }
      return newSet;
    };
    self.setBrbTimespans = function(){
      self.displayableBrbs.whizard = self.getBrbTimespans(self.timespan, self.whizard.brbs);
      self.displayableBrbs.avg = self.getBrbTimespans(self.timespan, self.avgBrbs);
    }
  }]);
  var whizard = {
    username: undefined,
    fullname: undefined,
    brbs: new Array()
  };
})();
