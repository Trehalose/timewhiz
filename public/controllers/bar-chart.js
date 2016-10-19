(function(){
  angular.module('TimeWhiz').controller('barChartController', ['brbService', function(brbService){
    var self = this;
    self.chartDataSets = new Array();
    self.averageDurationsForChart = function(brbs){
      var averageBrbDurations = {
        overall: {duration: 0, count: 0, avg: 0},
        pee: {duration: 0, count: 0, avg: 0},
        poo: {duration: 0, count: 0, avg: 0},
        puke: {duration: 0, count: 0, avg: 0},
        makeup: {duration: 0, count: 0, avg: 0},
        escape: {duration: 0, count: 0, avg: 0},
        fetish: {duration: 0, count: 0, avg: 0}
      };
      // GO THROUGH BRBS, ADD DURATIONS & COUNT IF ACTIVITY-X = TRUE
      for(var b = 0; b < brbs.length; b++){
        averageBrbDurations.overall.duration += brbs[b].duration;
        averageBrbDurations.overall.count++;
        if(brbs[b].activities.pee === true){
          averageBrbDurations.pee.duration += brbs[b].duration;
          averageBrbDurations.pee.count++;
        }
        if(brbs[b].activities.poo === true){
          averageBrbDurations.poo.duration += brbs[b].duration;
          averageBrbDurations.poo.count++;
        }
        if(brbs[b].activities.puke === true){
          averageBrbDurations.puke.duration += brbs[b].duration;
          averageBrbDurations.puke.count++;
        }
        if(brbs[b].activities.makeup === true){
          averageBrbDurations.makeup.duration += brbs[b].duration;
          averageBrbDurations.makeup.count++;
        }
        if(brbs[b].activities.escape === true){
          averageBrbDurations.escape.duration += brbs[b].duration;
          averageBrbDurations.escape.count++;
        }
        if(brbs[b].activities.fetish === true){
          averageBrbDurations.fetish.duration += brbs[b].duration;
          averageBrbDurations.fetish.count++;
        }
      }
      //AVERAGE THE DURATION, SEND BACK AVGED DURATIONS
      if(averageBrbDurations.pee.count > 0){averageBrbDurations.pee.avg = (averageBrbDurations.pee.duration / averageBrbDurations.pee.count)/(60*1000);}
      if(averageBrbDurations.poo.count > 0){averageBrbDurations.poo.avg = (averageBrbDurations.poo.duration / averageBrbDurations.poo.count)/(60*1000);}
      if(averageBrbDurations.puke.count > 0){averageBrbDurations.puke.avg = (averageBrbDurations.puke.duration / averageBrbDurations.puke.count)/(60*1000);}
      if(averageBrbDurations.makeup.count > 0){averageBrbDurations.makeup.avg = (averageBrbDurations.makeup.duration / averageBrbDurations.makeup.count)/(60*1000);}
      if(averageBrbDurations.escape.count > 0){averageBrbDurations.escape.avg = (averageBrbDurations.escape.duration / averageBrbDurations.escape.count)/(60*1000);}
      if(averageBrbDurations.fetish.count > 0){averageBrbDurations.fetish.avg = (averageBrbDurations.fetish.duration / averageBrbDurations.fetish.count)/(60*1000);}
      if(averageBrbDurations.overall.count > 0){averageBrbDurations.overall.avg = (averageBrbDurations.overall.duration / averageBrbDurations.overall.count)/(60*1000);}
      return [
        averageBrbDurations.overall.avg,
        averageBrbDurations.pee.avg,
        averageBrbDurations.poo.avg,
        averageBrbDurations.puke.avg,
        averageBrbDurations.makeup.avg,
        averageBrbDurations.escape.avg,
        averageBrbDurations.fetish.avg
      ];
    };
    self.chartLabels = ["Overall BRBs", "Pee BRBs", "Poo BRBs", "Sick BRBs", "Hygiene BRBs", "Etc. BRBs", "Fetish BRBs"];
    self.formatDataForChart = function(setName, brbs, color){
      var dataSet = { //should have 7 items of info for each activity and overall brbs
        label: setName,
        data: new Array(),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 5
      };
      if(brbs instanceof Array && brbs.length > 0){
        dataSet.data = self.averageDurationsForChart(brbs);
        //console.log(dataSet.data);
      }
      return dataSet;
    };
  }]);
})();
