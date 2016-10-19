(function(){
  angular.module("TimeWhiz").directive('radarChart',function(){
    return {
      restrict: 'E',
      templateUrl: '../parts/radar-chart.html',
      scope: {
        getbrbs: '='
      },
      controller: 'radarChartController',
      controllerAs: 'radarChartCtrl',
      link: function(scope, element, attr, chartCtrl){
        Chart.defaults.global.responsive = false; //Cancels responsiveness of iframe, not resizing canvas to 0
        var ctx = element.find('canvas')[0].getContext('2d');
        var chartData
        var radarChart;
        scope.getbrbs
        .success(function(brbs){
          chartCtrl.radarBrbs = chartCtrl.prepareDataForChart(brbs);
          radarChart = new Chart(ctx, { //DOES NOT WORK? HEIGHT/WIDTH SET TO 0 :-(
            type: 'radar',
            data: chartCtrl.radarBrbs,
            options: {
              scale: {
                type: 'radialLinear',
                ticks: {
                  stepSize: 1,
                  beginAtZero: true
                }
              }
            }
          });
        })
        .error(function(err){
          console.log(err);
        });
      }
    };
  });
})();
