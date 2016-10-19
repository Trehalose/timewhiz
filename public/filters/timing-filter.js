(function(){
  angular.module("TimeWhiz")
  .filter("ratioTime", function(){
    return function(x){
      var msec = 0;
      var sec = 0;
      var min = 0;
      var hr = 0;
      for(var i = 0; i <= x; i++){
        msec++;
        if(msec >= 1000){
          sec++;
          msec = 0;
        }
        if(sec >= 60){
          min++;
          sec = 0;
        }
        if(min >= 60){
          hr++;
          min = 0;
        }
      };
      return hr + ":" + min + ":" + sec + ":" + msec;
    };
  })
  .filter("wordTime", function(){
    return function(x){
      var time = {
        msec: 0,
        sec: 0,
        min: 0,
        hr: 0
      };
      var text = "";
      for(var i = 0; i <= x; i++){
        time.msec++;
        if(time.msec >= 1000){
          time.sec++;
          time.msec = 0;
        }
        if(time.sec >= 60){
          time.min++;
          time.sec = 0;
        }
        if(time.min >= 60){
          time.hr++;
          time.min = 0;
        }
      };
      if(time.hr > 0){
        text += time.hr + " hours, ";
      }
      if(time.hr > 0 && time.min > 0){
        text += time.min + " minutes, ";
      }
      if(time.hr > 0 || time.min > 0 || time.sec > 0){
        text += time.sec + " seconds and ";
      }
      text += time.msec + " milliseconds";
      return text;
    };
  });
})();
