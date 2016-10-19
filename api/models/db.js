var readLine = require('readline');
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/timewhiz';
if(process.env.NODE_ENV === 'production'){
  dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI);
//Make sure windows can detect a shutdown event
if(process.platform === "win32"){
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", function(){
    process.emit("SIGINT");
  });
}
//Make sure you can shut down real-good-like
var shutTheFuncDown = function(message, callback){
  mongoose.connection.close(function(){
    console.log(message);
    callback();
  });
}
var endItNow = function(){process.exit(0);};
process.on("SIGINT", function(){
  shutTheFuncDown("Local termination... leaving database... Bye-bye!~", endItNow);
});
process.on("SIGTERM", function(){
  shutTheFuncDown("Heroku termination... leaving database... Bye-bye!~", endItNow);
});
//check connections
mongoose.connection.on('connected', function(){console.log("Connected to Mongo");});
mongoose.connection.on('error', function(){console.log("Problem connecting to Mongo");});
mongoose.connection.on('disconnected', function(){console.log("Disconnected from Mongo");});
require('./user');
