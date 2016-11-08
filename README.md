# BugTrackSystem_MERN
Using react, express, nodejs, mongodb, matieral-ui

How to run this Demo
1:Install mongodb, make sure it's runing
2:Insert following data into the DB
db.bugstatus.insert([
  {status:'Open'},
  {status:'Verified'},
  {status:'Closed'},
  {status:'Resolved'},
  {status:'Active'},
  {status:'Need Merge'},
  {status:'New'}
]);
3: Install related module 
npm install
node server
4:Visit localhost:3000