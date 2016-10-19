var mongoose = require('mongoose');
var User = require('../models/user');
var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};
var pullAllUserBrbs = function(userData){
  var brbsFromData = new Array();
  for(var i = 0; i < userData.length; i++){
    for(var j = 0; j < userData[i].brbs.length; j++){
      brbsFromData.push(userData[i].brbs[j]);
    }
  }
  return brbsFromData;
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
module.exports.getAllUserBrbs = function(req, res){
  User.find(function(err, users){
    if(err){
      sendJSONresponse(res, 404, err);
      return;
    }
    else if(!users){
      sendJSONresponse(res, 404, {message: 'shit aint real!'});
      return;
    }
    else{}
    var allBRBs = pullAllUserBrbs(users);
    sendJSONresponse(res, 200, allBRBs);
  })
  .select('brbs -_id');
};
module.exports.getAUser = function(req, res){
  getWhizard(req, res, function(req,res,userId){
    User.findOne({_id: userId}, function(err, user){
      if(err){
        sendJSONresponse(res, 404, err);
      }
      else{
        sendJSONresponse(res, 200, user);
      }
    })
    .select('fullname username');
  });
};
module.exports.getUserBrbs = function(req, res){
  getWhizard(req, res, function(req,res,userId){
    var now = new Date();
    var yesterday = new Date(now-(24*60*60*1000));
    var yesterday = now.setDate(now.getDate()-1);
    User.findOne({_id: userId}, function(err, user){
      if(err){
        sendJSONresponse(res, 404, err);
      }
      else{
        sendJSONresponse(res, 200, user.brbs);
      }
    })
    .select('brbs -_id');
  });
};
module.exports.getUser24HrBrbs = function(req, res){
  getWhizard(req, res, function(req,res,userId){
    var now = new Date();
    var yesterday = new Date(now-(24*60*60*1000));
    var yesterday = now.setDate(now.getDate()-1);
    User.findOne({_id: userId}, function(err, user){
      if(err){
        sendJSONresponse(res, 404, err);
      }
      else{
        var todaysBrbs = new Array();
        for(var i = 0; i < user.brbs.length; i++){
          if(user.brbs[i].startTime > yesterday){
            todaysBrbs.push(user.brbs[i]);
          }
          else{}
        }
        sendJSONresponse(res, 200, todaysBrbs);
      }
    })
    .select('brbs -_id');
  });
};
