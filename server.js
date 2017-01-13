var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');
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
var CommentImageModel = require('./src/models').CommentImage;
var assert = require('assert');
var fs = require('fs');
var multer  = require('multer');
var formidable = require('formidable');
var utile = require('utile');
async = require('async');
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
//var routes = require('./routes');

var saveImage = function(file,comId,des) {
  var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
   imgUrl = '';
  for(var i=0; i < 8; i+=1) {
    imgUrl += possible.charAt(Math.floor(Math.random() *
    possible.length));
  }
  var tempPath = file.path,
  ext = path.extname(file.name).toString().toLowerCase(),
  targetPath = path.resolve('./public/upload/' + imgUrl + ext);
  CommentImageModel.find({ filename: imgUrl }, function(err, images) {
  if (images.length> 0) {
    saveImage();
   } else {
        fs.rename(file.path, targetPath,function(err) {
          if (err) throw err;
          var newImg = new CommentImageModel({
            commentId: comId,
            title:file.name,
            file: targetPath,
            description:des,
            filename: imgUrl + ext,
          });
          newImg.save(function(err, image) {
            console.log('Successfully inserted image: ' + image.filename +",  id:" + image.id + ", description: "+ des);
            
          });  
        });   
    }
  });
};

mongoose.connect('mongodb://localhost/dashBoard');
mongoose.connection.on('open', function() {
  console.log('Mongoose connected.');
});


app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: config.output.publicPath,
    
    noInfo: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

/*
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
*/

app.post('/api/imageAdd/',function(req,res){
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  
  form.uploadDir = path.resolve('./public/tmp/');
  console.info(form.uploadDir)
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.info(file.path)
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);  
});

//app.use(multer({ dest: path.join(__dirname,'public/upload/tmp')}).any());
app.use(bodyParser.json()) ;
app.post('/api/bugAdd/',function(req,res){
  var fileArr=[];
  var post={}; 
  var form = new formidable.IncomingForm();
  
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.resolve('./public/tmp/');
  //console.info(form.uploadDir)
  
  form.on('field', function(field, value) { 
      console.info("got field: "+ field + ". value: "+ value )
      post[field] = value;
  }) 

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.info("file path: "+file.path)    
    //fs.rename(file.path, path.join(form.uploadDir, file.name));
    fileArr.push(file);
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    var comTmp = JSON.parse(post.comment)
    var hisTmp = JSON.parse(post.history)
    var desTmp = JSON.parse(post.descirption)
    //req.body = utile.mixin(req.body, post)
    //console.info(req.body)
    //console.info( comTmp.user)
    //console.info( hisTmp[0].historyUser)
    //console.info( desTmp[0])
    
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

    BugIdModel.findOne({_id: "bugIdSchema"}, function(err, id) {
    if (err) { 
     console.log('Failed to inserted bug: ' + err);
     // throw err; 
    }
    
    
    var newBug = new BugsModel({    
            id:id.count,        
            title: post.title,
            priority: post.priority,
            status: post.status,
            owner: post.owner,
            submitter: post.submitter,
            feature: post.feature,
            timestamp: post.date,
            version: post.version,                
            history: hisTmp,  

          });
    
    newBug.save(function(err, addedBug) {
      if (err) { throw err; }    
      console.log('Successfully inserted bug: ' + addedBug.id);
      var imageRes = (fileArr.length>0)
      var newComment = new CommentModel({
        text:comTmp.text,
        user:comTmp.user,
        bugId:addedBug._id,
        imageInclude:imageRes,
      });
      newComment.save(function(err, addedComment) {
          if (err) {         
            console.log('Failed to inserted comment: ' + err);
          }    
          console.log('Successfully inserted comment: ' + addedComment.id);
          
          async.each(fileArr,
            // 2nd param is the function that each item is passed to
            function(file, next){
              console.info("file: ",file.name)
              // Call an asynchronous function, often a save() to DB
              var index = fileArr.indexOf(file)
              console.info("index", index)
              saveImage(file,addedComment.id,desTmp[index]);
              next(err);
            },
            // 3rd param is the function to call when everything's done
            function(err){        
              if (err) throw err; 
              var result = {'id':addedBug.id,'status':addedBug.status,'priority':addedBug.priority,'owner':addedBug.owner,'title':addedBug.title}   
              //console.info(result)    
              res.json(result);
            }
          );
         
        //res.json(addedBug);
     });
    }); 
   
    }); 
    
  }); //  form end  
  // parse the incoming request containing the form data
  form.parse(req);       
 
});

app.get('/api/bugOwner', function(req, res) {
  BugsModel.distinct('owner',function(err, docs) {  
    if (err) { throw err; }    
    res.json(docs);
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
  //console.info("id",req.params.id) 
  BugsModel.findOne({id: req.params.id}, function(err, bug) {
    if (err) { throw err; }
    //console.info("bug",bug) 
    res.json(bug);
  });
});

app.get('/api/comment/:id', function(req, res) {      
  BugsModel.findOne({id:req.params.id},{'_id':1,},function(err, result){
    CommentModel.find({bugId: ObjectId(result._id)}, function(err, comments) {
      if (err) { throw err; }
      async.each(comments,
        // 2nd param is the function that each item is passed to
        function(comment, next){
          //console.info("commentid: ",comment._id)
          // Call an asynchronous function, often a save() to DB
          CommentImageModel.find({commentId : ObjectId(comment._id)},function(err, image) {
            if (err) throw err;
            comment.image = image;
            next(err);
          });
          
        },
        // 3rd param is the function to call when everything's done
        function(err){        
          if (err) throw err;        
          res.json(comments);
        }
      );
    });//end comment find
  })
  /*
  CommentModel.find({bugId: ObjectId(req.params.id)}, function(err, comments) {
    if (err) { throw err; }
    async.each(comments,
      // 2nd param is the function that each item is passed to
      function(comment, next){
        console.info("commentid: ",comment._id)
        // Call an asynchronous function, often a save() to DB
        CommentImageModel.find({commentId : ObjectId(comment._id)},function(err, image) {
          if (err) throw err;
          comment.image = image;
          next(err);
        });
        
      },
      // 3rd param is the function to call when everything's done
      function(err){        
        if (err) throw err;        
        res.json(comments);
      }
    );
  });//end comment find
  */
});

app.get('/api/image/:id', function(req, res) {  
  CommentImageModel.find({commentId: ObjectId(req.params.id)}, function(err, image) {
    if (err) { throw err; }
    //console.info(comm);
    res.json(image);
  });
});

app.get('/api/bugs', function(req, res) {
  BugsModel.find(function(err, docs) {
    if (err) { throw err; }
    res.json(docs);
  });
});


app.get('/api/partBugs', function(req, res) {
  var filterTmp = JSON.parse(req.query.filter)
  
  var filter = []
  
  if(filterTmp.id){
    
    filter.push({fieldName: "id", value: filterTmp.id})
  }
  if(filterTmp.title){
    
    filter.push({fieldName: "title", value: filterTmp.title})
  }
  if(filterTmp.status !== "All" && filterTmp.status ){        
    
    filter.push({fieldName: "status", value: filterTmp.status})
  }
  if(filterTmp.priority !== "All" && filterTmp.priority){
    
    filter.push({fieldName: "priority", value: filterTmp.priority})
  }
  if(filterTmp.owner !== "All" && filterTmp.owner){
    
    filter.push({fieldName: "owner", value: filterTmp.owner})
  }
  var query = BugsModel.find({},{'id':1,'status':1,'priority':1,'owner':1,'title':1});
  for (var i = 0; i < filter.length; i++) {
    console.info(filter[i].fieldName,filter[i].value)
    if(filter[i].fieldName === "title"){
      query.where(filter[i].fieldName).regex(filter[i].value)
      continue
    }
    query.where(filter[i].fieldName).equals(filter[i].value)
  }
  query.sort({'id':-1}).exec(function(err, docs) {
    if (err) { throw err; }
    //console.info(docs.length)
    //console.info(docs[0])
    var start= req.query.visiblePages*req.query.index;
    var end =  (parseInt(req.query.index) + 1) * req.query.visiblePages;
    //console.info("start, end",start, end)
    var result  = docs.slice(start, end)
    //console.info(result.length)
    //Math.ceil(docs.length/req.query.visiblePages) 
    res.json({total:docs.length,bugs:result});
  });
});

app.post('/api/bugs/:id', function(req, res) {
  /*
  var bug = req.body;
  //console.log("Modifying bug:", req.params.id, bug);
  console.log("Modifying bug comment:", bug.comment);
  var oid = ObjectId(req.params.id);
  BugsModel.update({_id: oid}, bug, function(err, result) {
    if (err) { throw err; }
    var newComment = new CommentModel({
        text:bug.comment.text,
        user:bug.comment.user,
        bugId:oid,
      });
    newComment.save(function(err, addedComment) {
        if (err) {         
          console.log('Failed to inserted comment: ' + err);
        }    
        console.log('Successfully inserted comment: ' + addedComment.id);
        BugsModel.findOne({_id: oid}, function(err, docs) {
          if (err) { throw err; }
          //console.info(oid)
          //console.info(docs)
          res.json(docs);
        });           
      });
  });
  */
  
  console.log("Modifying:", req.params.id);
  
  var fileArr=[];
  var post={};
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.resolve('./public/tmp/');
  form.on('field', function(field, value) {      
      console.info("got field: "+ field + ". value: "+ value ) 
      post[field] = value;
  }) 

  form.on('file', function(field, file) {    
    //console.info("file path: "+file.path) 
    fileArr.push(file);
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    
    var comTmp = JSON.parse(post.comment)
    var hisTmp = JSON.parse(post.history)
    var desTmp = JSON.parse(post.descirption)
    
    console.info("comTmp.text: ",comTmp.text)
    console.info("des: ",desTmp)
    console.info("history: ",hisTmp[0].historyStatus)
    //console.log("Modifying bug:",  );
    //console.info( fileArr[0])
    
    var newBug = {                    
            title: post.title,
            priority: post.priority,
            status: post.status,
            owner: post.owner,
            submitter: post.submitter,
            feature: post.feature,
            timestamp: post.date,
            version: post.version,                
            history: hisTmp,  
          };

       
    BugsModel.update({id: req.params.id}, newBug, function(err, result) {
      if (err) { throw err; }
      BugsModel.findOne({id:req.params.id},{'_id':1,},function(err, result){
        console.info("result",result)
        console.info("_id",result._id)
        var imageRes = (fileArr.length>0)
        var newComment = new CommentModel({
            text:comTmp.text,
            user:comTmp.user,
            bugId:result._id,
            imageInclude:imageRes,
          });
        newComment.save(function(err, addedComment) {
            if (err) {         
              console.log('Failed to inserted comment: ' + err);
            }    
            console.log('Successfully inserted comment: ' + addedComment.id);
            for(var x=0;x<fileArr.length;x++){
              saveImage(fileArr[x],addedComment.id,desTmp[x]);
            }            
            BugsModel.findOne({_id: result._id}, function(err, bug) {
              if (err) { throw err; }
              //console.info(oid)
              //console.info(docs)
              CommentModel.find({bugId: ObjectId(result._id)}, function(err, comm) {
                if (err) { throw err; }
                //console.info(comm);
                
                CommentImageModel.find({commentId: ObjectId(addedComment.id)}, function(err, image) {
                  if (err) { throw err; }
                  //console.info(comm);
                  res.json({bug:bug,com:comm,img:image});
                }); 
              });
              
            });     //end BugsModel findOne      
          });
      })
      
    }); //end update
    
  });

  form.parse(req);  
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





app.listen(3030, 'localhost', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3030');
});
