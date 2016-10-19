(function(){
  angular.module("TimeWhiz").controller("lineChartController", ['brbService', function(brbService){
    var self = this;
    self.chartData;
    self.calculateDataSet = function(brbs, labelSet){
      //Go through brbs, if on same date as in formattedDataSet.labels[x], ++ to formattedDataSet.dataset[y].data[x]
      var dataSets = [
        {label:"Pee BRBs", data: new Array(), borderColor: "rgba(255, 170, 0, 0.75)", backgroundColor: "rgba(0,0,0,0)"},
        {label:"Poo BRBs", data: new Array(), borderColor: "rgba(119, 62, 34, 0.75)", backgroundColor: "rgba(0,0,0,0)"},
        {label:"Puke/Sick BRBs", data: new Array(), borderColor: "rgba(112, 112, 16, 0.75)", backgroundColor: "rgba(0,0,0,0)"},
        {label:"Makeup/Hygiene BRBs", data: new Array(), borderColor: "rgba(153, 204, 255, 0.75)", backgroundColor: "rgba(0,0,0,0)"},
        {label:"Social Escape BRBs", data: new Array(), borderColor: "rgba(51, 102, 102, 0.75)", backgroundColor: "rgba(0,0,0,0)"},
        {label:"Fetish BRBs", data: new Array(), borderColor: "rgba(255, 80, 80, 0.75)", backgroundColor: "rgba(0,0,0,0)"},
        {label: "Overall BRBS", data: new Array(), borderColor: "rgba(128, 128, 128, 0.5)", backgroundColor: "rgba(0,0,0,0)"}
      ];
      for(lb = 0; lb < labelSet.length; lb++){
        var lbDate = labelSet[lb].toDate();
        for(var b = 0; b < brbs.length; b++){
          var brbDate = new Date(brbs[b].startTime);
          if(lbDate.toDateString() === brbDate.toDateString()){
            if(dataSets[6].data[lb] === undefined){dataSets[6].data[lb]=0;}
            dataSets[6].data[lb]++;
            if(brbs[b].activities.pee === true){
              if(dataSets[0].data[lb] === undefined){dataSets[0].data[lb]=1;}
              else{dataSets[0].data[lb]++}
            }
            else{
              if(dataSets[0].data[lb] === undefined){dataSets[0].data[lb]=0;}
            }
            if(brbs[b].activities.poo === true){
              if(dataSets[1].data[lb] === undefined){dataSets[1].data[lb]=1;}
              else{dataSets[1].data[lb]++}
            }
            else{
              if(dataSets[1].data[lb] === undefined){dataSets[1].data[lb]=0;}
            }
            if(brbs[b].activities.puke === true){
              if(dataSets[2].data[lb] === undefined){dataSets[2].data[lb]=1;}
              else{dataSets[2].data[lb]++}
            }
            else{
              if(dataSets[2].data[lb] === undefined){dataSets[2].data[lb]=0;}
            }
            if(brbs[b].activities.makeup === true){
              if(dataSets[3].data[lb] === undefined){dataSets[3].data[lb]=1;}
              else{dataSets[3].data[lb]++}
            }
            else{
              if(dataSets[3].data[lb] === undefined){dataSets[3].data[lb]=0;}
            }
            if(brbs[b].activities.escape === true){
              if(dataSets[4].data[lb] === undefined){dataSets[4].data[lb]=1;}
              else{dataSets[4].data[lb]++}
            }
            else{
              if(dataSets[4].data[lb] === undefined){dataSets[4].data[lb]=0;}
            }
            if(brbs[b].activities.fetish === true){
              if(dataSets[5].data[lb] === undefined){dataSets[5].data[lb]=1;}
              else{dataSets[5].data[lb]++}
            }
            else{
              if(dataSets[5].data[lb] === undefined){dataSets[5].data[lb]=0;}
            }
          }
        }
      }
      return dataSets;
    };
    self.calculateTimeSet = function(brbs){
      //Go through each brb and only create new item if on new day
      var labelSet = new Array();
      //if(brbs instanceof Array){
        for(var b = 0; b < brbs.length; b++){
          var thisTime = new Date(brbs[b].startTime);
          if(labelSet.length <= 0){labelSet.push(thisTime);}
          var sameAsAny = false;
          for(var lb = 0; lb < labelSet.length; lb++){
            if(labelSet[lb].toDateString() === thisTime.toDateString()){sameAsAny = true;}
            if(lb+1 >= labelSet.length && sameAsAny !== true){
              labelSet.push(thisTime);
            }
          }
        }
        for(var lb = 0; lb < labelSet.length; lb++){
          labelSet[lb] = moment(labelSet[lb]);
        }
      //}
      return labelSet;
    };

    self.prepareBrbsForChart = function(brbs){
      //TODO: TIMESPAN OF: all & each activity, RESPECTIVELY 1 PER DATASET
      var formattedDataSet = {
        labels: new Array(), //TIME OF BRB
        datasets: []
      };
      if(brbs instanceof Array && brbs.length > 0){
        formattedDataSet.labels = self.calculateTimeSet(brbs);
        formattedDataSet.datasets = self.calculateDataSet(brbs, formattedDataSet.labels);
      }
      return formattedDataSet;
    };
    self.chartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          unit: 'day',
          unitStepSize: 1,
          time: {
            displayFormats: {
              'day':'DD MMM \'YY'
            }
          }
        }]
      }
    };
  }]);
})();
