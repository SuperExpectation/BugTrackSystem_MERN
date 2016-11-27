var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId,
path = require('path');
var CommentSchema = new Schema({
bugId: {type: ObjectId },	
text: { type: String },
user: { type: String },
timestamp: { type: Date, 'default': Date.now },
});

module.exports = mongoose.model('comment', CommentSchema,'comment');