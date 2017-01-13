var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId,
path = require('path');

var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };


var CommentSchema = new Schema({
bugId: {type: ObjectId },	
text: { type: String },
user: { type: String },
timestamp: { type: Date, 'default': Date.now },
imageInclude:{type:Boolean,}
},schemaOptions);

CommentSchema.virtual('image').set(function(image){
	this._image = image;
 }).get(function() {
	return this._image;
 });


module.exports = mongoose.model('comment', CommentSchema,'comment');