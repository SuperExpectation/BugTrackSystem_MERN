#!/usr/bin/mongo

var db = new Mongo().getDB("dashBoard");

db.status.remove({});

db.status.insert([
  {status:'Open'},
  {status:'Verified'},
  {status:'Closed'},
  {status:'Resolved'},
  {status:'Active'},
  {status:'Need Merge'},
  {status:'New'}
]);

