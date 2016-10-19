var crypto = require('crypto');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var BRBSchema = new mongoose.Schema({
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  duration: {type: Number, required: true},
  activities: {},
});
var userSchema = new mongoose.Schema({
  fullname: String,
  username: {type: String, required: true, unique: true},
  salt: String,
  hash: String,
  termsAgree: {type: Boolean, required: true},
  brbs: [BRBSchema]
});
userSchema.methods.setPassword = function(pass){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');
};
userSchema.methods.validatePassword = function(pass){
  var comparison = crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');
  return this.hash === comparison;
};
userSchema.methods.generateJWT = function(){
  var exp = new Date();
  exp.setDate(exp.getDate() + 7);
  return jwt.sign({ id: this._id, username: this.username, exp: parseInt(exp.getTime()/1000)}, process.env.JWT_SECRET);
};
module.exports = mongoose.model("Users", userSchema);
