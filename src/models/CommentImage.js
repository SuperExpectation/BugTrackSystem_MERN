var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId,
path = require('path');
var CommentImageSchema = new Schema({
commentId: { type: ObjectId,  required: true },
title: { type: String},
file: { type: String  },
user: {type: String},
description: {type: String},
filename: { type: String,  required: true },
});

module.exports = mongoose.model('commentImage', CommentImageSchema,'commentImage');