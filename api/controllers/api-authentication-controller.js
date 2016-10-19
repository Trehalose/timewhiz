var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');
var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};
module.exports.registerUser = function(req, res){
  if(!req.body.password || !req.body.termsAgree || !req.body.username){
    console.log("the fields aren't all filled...");
    sendJSONresponse(res, 404, {message: "the fields aren't all filled!"});
    return;
  }
  var user = new User();
  user.fullname = req.body.fullname;
  user.username = req.body.username;
  user.termsAgree = req.body.termsAgree;
  user.setPassword(req.body.password);
  user.save(function(err){
    var token;
    if(err){
      sendJSONresponse(res, 404, err);
    }
    else{
      token = user.generateJWT();
      sendJSONresponse(res,201,{"token": token});
    }
  });
};
module.exports.loginUser = function(req, res){
  if(!req.body.password || !req.body.username){
    console.log("the fields aren't all filled...");
    sendJSONresponse(res, 404, {message:"the fields aren't all filled!"});
    return;
  }
  passport.authenticate('local', function(err, user, info){
    var token;
    if(err){
      sendJSONresponse(res, 404, err);
      return;
    }
    if(user){
      token = user.generateJWT();
      sendJSONresponse(res, 201, {"token": token});
    }
    else{
      sendJSONresponse(res, 401, {message: "Sometimes shit goes wrong. This is that time."});
    }
  })(req, res);
};
