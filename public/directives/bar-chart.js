(function(){
  angular.module('TimeWhiz').directive('barChart', function(){
    return {
      restrict: 'E',
      templateUrl: '../parts/bar-chart.html',
      scope: {
        whizardbrbs: '=',
        avgbrbs: '='
      },
      controller: 'barChartController',
      controllerAs: 'barChartCtrl',
      link: function(scope, element, attr, chartCtrl){
        Chart.defaults.global.responsive = false;
        var ctx = element.find('canvas')[0].getContext('2d');
        var barChart;
        scope.$watchGroup(['whizardbrbs','avgbrbs'], function(newVals, oldVals){
          if(newVals){
            chartCtrl.chartDataSets = new Array();
            chartCtrl.chartDataSets.push(chartCtrl.formatDataForChart("Your Brbs", scope.whizardbrbs, "rgba(255, 170, 0, 1)"));
            chartCtrl.chartDataSets.push(chartCtrl.formatDataForChart("Avg. Brbs", scope.avgbrbs, "rgba(112, 112, 16, 0.75)"));
            barChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: chartCtrl.chartLabels,
                datasets: chartCtrl.chartDataSets
              },
              options: {
                scales: {
                  yAxes: [{
                      type: 'linear',
                      beginAtZero: true,
                      stepSize: 1
                  }]
                }
              }
            });
          }
        })
      }
    };
  });
})();
