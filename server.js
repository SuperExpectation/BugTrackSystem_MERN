var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var app = express();
var compiler = webpack(config);
var BugsModel = require('./src/models').Bugs;
var BugStatusModel = require('./src/models').BugStatus;
var StatusModel = require('./src/models').Status;
var BugIdModel = require('./src/models').BugId;
var CommentModel = require('./src/models').Comment;
var assert = require('assert')
//var routes = require('./routes');



mongoose.connect('mongodb://localhost/dashBoard');
mongoose.connection.on('open', function() {
  console.log('Mongoose connected.');
});



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(bodyParser.json());
app.post('/api/bugAdd/',function(req,res){
  //console.log("Req body:", req.body);  
   
  function incrementCounter(schemaName, callback){
    BugIdModel.findAndModify({ _id: schemaName }, [], 
      { $inc: { count: 1 } }, {"new":true, upsert:true}, function (err, result) {
        if (err)
          callback(err);
        else
          callback(null, result.count);
    });
  }
  var idTmp = incrementCounter("bugIdSchema",function(err, docs) {  
    if (err) { 
      console.error('Counter on save error: ' + err);       
    }    
  })
  
  /*
  var query = BugIdModel.findOne({_id: "bugIdSchema"});
  //var promise = query.exec();
  //assert.ok(promise instanceof require('mpromise'));
  assert.ok(!(query instanceof require('mpromise')));
  query.then(function (doc) {
    // use doc
    console.info("find:"+ doc.count)  
    var newBug = new BugsModel({    
            id:doc.count,        
            title: req.body.title,
            priority: req.body.priority,
            status: req.body.status,
            owner: req.body.owner,
            submitter: req.body.submitter,
            feature: req.body.feature,
            timestamp: req.body.timestamp,
            version: req.body.version,
            comment: req.body.comment,
            history: req.body.history,            
          });
    var promise = newBug.save();
    assert.ok(promise instanceof require('mpromise'));

    promise.then(function (doc) {
      assert.equal(doc.title, req.body.title);
      res.json(addedBug); 
    });    
  */  
  
 
  BugIdModel.findOne({_id: "bugIdSchema"}, function(err, id) {
    if (err) { 
     console.log('Failed to inserted bug: ' + err);
     // throw err; 
    }
    console.info("find:"+ id.count)  
    var newBug = new BugsModel({    
            id:id.count,        
            title: req.body.title,
            priority: req.body.priority,
            status: req.body.status,
            owner: req.body.owner,
            submitter: req.body.submitter,
            feature: req.body.feature,
            timestamp: req.body.timestamp,
            version: req.body.version,                
            history: req.body.history,            
          });
    newBug.save(function(err, addedBug) {
      if (err) { throw err; }    
      console.log('Successfully inserted bug: ' + addedBug.id);
      var newComment = new CommentModel({
        text:req.body.comment,
        bugId:addedBug._id,
      });
      newComment.save(function(err, addedComment) {
          if (err) {         
            console.log('Failed to inserted comment: ' + err);
          }    
          console.log('Successfully inserted comment: ' + addedComment.id);
          res.json(addedBug);            
        }); 
        
    }); 
  });  
   
});



app.get('/api/bugStatus', function(req, res) {
  BugsModel.distinct('status',function(err, docs) {  
    if (err) { throw err; }
    res.json(docs);
  });
});

app.get('/api/bugStatusAll', function(req, res) {        
  BugStatusModel.distinct('status',function(err, statusDocs) {  
    if (err) { throw err; }    
    res.json(statusDocs);
  });
  /*
  BugStatusModel.remove({"status":"Open"},function(err) {  
    if (err) { throw err; }
    console.info("ok:");
    
  });
  BugStatusModel.find(function(err, statusDocs) {
    if (err) { throw err; }
    console.info("len:"+ statusDocs.length );
    console.info("change:"+ statusDocs );
    res.json(statusDocs);
  });
  */
});

app.get('/api/bug/:id', function(req, res) {  
  BugsModel.findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
    if (err) { throw err; }
    res.json(bug);
  });
});

app.get('/api/bugs', function(req, res) {
  BugsModel.find(function(err, docs) {
    if (err) { throw err; }
    res.json(docs);
  });
});

app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  var oid = ObjectId(req.params.id);
  BugsModel.update({_id: oid}, bug, function(err, result) {
    if (err) { throw err; }
    BugsModel.findOne({_id: oid}, function(err, docs) {
      if (err) { throw err; }
      console.info(oid)
      console.info(docs)
      res.json(docs);
    });
  });
});

app.get('/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'));
});
 

app.get('/css/font-awesome.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/font-awesome.css'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});





app.listen(3000, 'localhost', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000');
});
