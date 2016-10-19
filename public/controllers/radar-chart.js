(function(){
  angular.module("TimeWhiz").controller("radarChartController", [function(){
    var self = this;
    self.todaysBrbs;
    self.radarBrbs = new Array();
    self.prepareDataForChart = function(data){
      var dailyActivities = {
          pee: 0,
          poo: 0,
          puke: 0,
          makeup: 0,
          escape: 0,
          fetish: 0
      };
      for(var i = 0; i < data.length; i++){
        if(data[i].activities.pee){dailyActivities.pee++;}
        if(data[i].activities.poo){dailyActivities.poo++;}
        if(data[i].activities.puke){dailyActivities.puke++;}
        if(data[i].activities.makeup){dailyActivities.makeup++;}
        if(data[i].activities.escape){dailyActivities.escape++;}
        if(data[i].activities.fetish){dailyActivities.fetish++;}
      }
      self.todaysBrbs = {
        total: data.length,
        activities: dailyActivities,
      }
      var formattedData = {
        labels: ["Pee", "Poo", "Sick", "Hygiene", "Etc.", "Fetish"],
        datasets: [{
          label: "Preferred Activities Today",
          backgroundColor: "rgba(255, 170, 0, 0.35)",
          borderColor: "rgba(255, 170, 0, 1)",
          pointBackgroundColor: "rgba(112, 112, 16, 0.35)",
          pointBorderColor: "rgba(112, 112, 16, 1)",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [dailyActivities.pee, dailyActivities.poo, dailyActivities.puke, dailyActivities.makeup, dailyActivities.escape, dailyActivities.fetish]
        }]
      };
      return formattedData;
    };
  }]);
})();
