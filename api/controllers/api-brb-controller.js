var mongoose = require('mongoose');
//var BRB = require('../models/brb');
var User = require('../models/user');
var addBrb = function(req, res, user){
  if(!user){
    sendJSONresponse(res, 404, {message: "user not found!"});
  }
  else{
    user.brbs.push({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      duration: req.body.duration,
      activities: req.body.activities
    });
    user.save(function(err, user){
      if(err){
        sendJSONresponse(res, 404, err);
      }
      else{
        sendJSONresponse(res, 201, user.brbs[user.brbs.length-1]);
      }
    });
  }
};
var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};
var getWhizard = function(req, res, callback){
  if(req.payload && req.payload.id){
    User.findOne({_id:req.payload.id})
    .exec(function(err,user){
      if(!user){
        console.log("Your Username is not authorized to be here");
        sendJSONresponse(res,404,{message: "Your Username is not authorized to be here"});
        return;
      }
      else if(err){
        console.log(err);
        sendJSONresponse(res,404,{message:err});
        return;
      }
      else{}
      callback(req,res,user._id);
    });
  }
  else{
    sendJSONresponse(res,404,{message: "idk bro. couldnt find anything!"});
    return;
  }
};
module.exports.createBrb = function(req, res){
  getWhizard(req, res, function(req,res,userId){
    User.findOne({_id: userId}, function(err, user){
      if(err){
        sendJSONresponse(res, 404, err);
      }
      else{
        addBrb(req, res, user);
      }
    });
  });
};
