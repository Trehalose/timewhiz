var mongoose = require('mongoose');
var BRBSchema = new mongoose.Schema({
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  duration: {type: Date, required: true},
  activities: {},//[activitiesSchema],
  userRef: String
});
module.exports = mongoose.model("BRBS", BRBSchema);
