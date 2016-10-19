(function(){
  angular.module("TimeWhiz").directive('lineChart',function(){
    return {
      restrict: 'E',
      templateUrl: '../parts/line-chart.html',
      scope: {
        brbs: '='
      },
      controller: 'lineChartController',
      controllerAs: 'lineChartCtrl',
      link: function(scope, element, attr, chartCtrl){
        Chart.defaults.global.responsive = false;
        var ctx = element.find('canvas')[0].getContext('2d');
        var lineChart;
        scope.$watch('brbs', function(newVal, oldVal){
          if(newVal){
            chartCtrl.chartData = chartCtrl.prepareBrbsForChart(scope.brbs);
            lineChart = new Chart(ctx, {
              type:'line',
              data: chartCtrl.chartData,
              options: chartCtrl.chartOptions
            });
          }
        });
      }
    };
  });
})();
