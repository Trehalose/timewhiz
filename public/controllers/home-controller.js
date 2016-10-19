(function(){
  angular.module('TimeWhiz').controller('homeController',['authService', function(authService){
    var self = this;
    self.isLoggedIn = function(){return authService.isLoggedIn();};
    self.randomFact = factGen();
  }]);
  var factGen = function(){
    var facts = [
      "During the average lifetime, we spend 3 years on the toilet!",
      "1 in 5 people get annoyed if the toilet paper roll is facing \'the wrong way\'.",
      "70% of house guests snoop through other people's bathroom cabinets & drawers!",
      "Men spend 2.4 minutes longer on the toilet than women.",
      "Elvis Presley, Georgia Lass, and Tywin Lannister all died with toilets.",
      "85% of injuries that happen in the bathroom are from falling into the toilet after the seat was left up.",

    ];
    var index = Math.floor((Math.random()*facts.length));
    return facts[index];
  };
})();
