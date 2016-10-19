var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user.js');
passport.use(new localStrategy({}, function(username, pass, done){
  User.findOne({username: username}, function(err, user){
    if(err){return done(err);}
    if(!user){return done(null, false, {message: 'incorrect username!'});}
    if(!user.validatePassword(pass)){return done(null, false, {message: "incorrect password!"});}
    return done(null, user);
  });
}));
