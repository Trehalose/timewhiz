(function(){
  angular.module("TimeWhiz").factory("brbService",['$http', 'authService', function($http, authService){
    var sortBrbsForTime = function(brbs){
        var brbsForTime = new Array();
        //Go through brbsFromData based on start times
        for(var n = 0; n < brbs.length; n++){
          var brbTimeArray = new Array();
          for(var m = n+1; m < brbs.length; m++){
            if(Date.parse(brbs[n].startTime) === Date.parse(brbs[m].startTime)){
              brbTimeArray.push(brbs.splice(m,1));
            }
          }
          brbTimeArray.push(brbs[n]);
          brbs[n]=null;
          brbsForTime.push(brbTimeArray);
        }
        return brbsForTime;
    };
    var avgAllBrbs = function(brbTimes){
      var allAvgBrbs = new Array();
      //Go through brbTimes to create tempbrb obj, avg datas into tempbrb, push tempbrb into self.allAvgBRBs
      for(var x = 0; x < brbTimes.length; x++){
        var tempbrb = {
          startTime: brbTimes[x][0].startTime,
          duration: 0,
          activities: {
            pee: false,
            poo: false,
            puke: false,
            makeup: false,
            escape: false,
            fetish: false
          }
        };
        tempDur = 0;
        tempActivities = {
          pee: 0,
          poo: 0,
          puke: 0,
          makeup: 0,
          escape: 0,
          fetish: 0
        };
        for(var y = 0; y < brbTimes[x].length; y++){
          tempDur += brbTimes[x][y].duration;
          if(brbTimes[x][y].activities.pee === true){tempActivities.pee++}
          if(brbTimes[x][y].activities.poo === true){tempActivities.poo++}
          if(brbTimes[x][y].activities.puke === true){tempActivities.puke++}
          if(brbTimes[x][y].activities.makeup === true){tempActivities.makeup++}
          if(brbTimes[x][y].activities.escape === true){tempActivities.escape++}
          if(brbTimes[x][y].activities.fetish === true){tempActivities.fetish++}
        }
        tempbrb.duration = tempDur/brbTimes[x].length;
        if(tempActivities.pee/brbTimes[x].length > 0.5){
          tempbrb.activities.pee = true;
        }
        if(tempActivities.poo/brbTimes[x].length > 0.5){
          tempbrb.activities.poo = true;
        }
        if(tempActivities.puke/brbTimes[x].length > 0.5){
          tempbrb.activities.puke = true;
        }
        if(tempActivities.makeup/brbTimes[x].length > 0.5){
          tempbrb.activities.makeup = true;
        }
        if(tempActivities.escape/brbTimes[x].length > 0.5){
          tempbrb.activities.escape = true;
        }
        if(tempActivities.fetish/brbTimes[x].length > 0.5){
          tempbrb.activities.fetish = true;
        }
        allAvgBrbs.push(tempbrb);
      }
      return allAvgBrbs;
    };
    var getTodaysBrbs = function(userId){
      return $http.get("./api/users/" + userId + "/brbs/today", {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };
    var getWhizardBrbs = function(userId){
      return $http.get("./api/users/" + userId + "/brbs", {
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      });
    };
    var getAllBrbs = function(){
      return $http.get("./api/users");
    };
    return {sortBrbsForTime: sortBrbsForTime, avgAllBrbs: avgAllBrbs, getWhizardBrbs: getWhizardBrbs, getTodaysBrbs: getTodaysBrbs, getAllBrbs: getAllBrbs};
  }]);
})();
