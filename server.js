"use strict";
//Variable setups
require('dotenv').load();
var express = require('express');
var app = express();
var passport = require('passport');
var db = require('./api/models/db');
var uglifyJS = require('uglify-js');
var fs = require('fs');
require('./api/config/passport');
var bodyParser = require('body-parser');
//UGLIFIED STUFF
var appClientFiles = [
  "./public/app.js",
  "./public/services/authentication.js",
  "./public/services/brb-service.js",
  "./public/controllers/home-controller.js",
  "./public/controllers/timer-controller.js",
  "./public/controllers/login-controller.js",
  "./public/controllers/nav-controller.js",
  "./public/controllers/whizard-controller.js",
  "./public/controllers/register-controller.js",
  "./public/controllers/radar-chart.js",
  "./public/controllers/line-chart.js",
  "./public/controllers/bar-chart.js",
  "./public/directives/timer.js",
  "./public/directives/radar-chart.js",
  "./public/directives/line-chart.js",
  "./public/directives/bar-chart.js",
  "./public/filters/timing-filter.js",
  "./public/routes/routes.js"
];
var uglyShit = uglifyJS.minify(appClientFiles, {compress: false});
fs.writeFile('./public/myuglycode.min.js', uglyShit.code, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Skrips generated and saved as one ugly mess: \'myuglycode.min.js\'!");
  }
});
//Static routes & file directory setups
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use('/skrips', express.static(__dirname + "/node_modules"));
//API routes setups
app.use(passport.initialize());
app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({"message":err.name+":"+err.message});
  }
});
var apiRoutes = require('./api/routes/routes');
app.use('/api', apiRoutes);
//Acive route setups
require('./private/routes/routes')(app, __dirname);
//Start app
var port = process.env.PORT || 8080;
app.listen(port, function(){console.log("Listening to port " + port);});
