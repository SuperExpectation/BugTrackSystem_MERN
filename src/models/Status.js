var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
path = require('path');
var StatusSchema = new Schema({
status: { type: String, required: true,'default':'New' }
});

module.exports = mongoose.model('status', StatusSchema);


