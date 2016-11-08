var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
path = require('path');
var BugsSchema = new Schema({
priority: { type: String },
status: { type: String, required: true },
owner: { type: String, required: true },
submitter: {type: String, required: true},
feature: {type: String, required: true},
title: { type: String,  required: true },
version: { type: String,  required: true },
comment:{type: Array},
history:[{historyStatus:{type:String,required: true},  historyUser:{type:String, required: true}}],
timestamp: { type: Date, 'default': Date.now },
});

module.exports = mongoose.model('bugs', BugsSchema);