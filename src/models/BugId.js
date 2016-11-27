/*
var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
path = require('path');
var StatusSchema = new Schema({
status: { type: String, required: true,'default':'New' }
});

module.exports = mongoose.model('status', StatusSchema);
*/

var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
path = require('path');
var bugIdSchema = new Schema({
_id:  String,
count: { type: Number}
});


bugIdSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};


module.exports = mongoose.model('bugid', bugIdSchema,'bugid');