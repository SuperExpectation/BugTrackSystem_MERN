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
  console.log("Req body:", req.body);
  var newBug = new BugsModel({
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
  newBug.save(function(err, addedBug) {
    if (err) { throw err; }    
    console.log('Successfully inserted bug: ' + addedBug._id);
    res.json(addedBug);    
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
