// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var apiRoutes = express.Router(); 
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
  var gzippo = require('gzippo');
 var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// var config = require('./config'); // get our config file
// var UserSchema   = require('./app/models/UserSchema'); // get our mongoose model
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

mongoose.connect('mongodb://qwer:rewq@apollo.modulusmongo.net:27017/dUb8asog'); // connect to database
// app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(gzippo.staticGzip("" + __dirname + "/"));

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
 app.get('/', function(req, res) {
        res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

  var UserSchema = new mongoose.Schema({
  email: String,
  user: { type: Number, required: true, unique: true },
  password : String,
  admin: Boolean,
  updated_at: { type: Date, default: Date.now },
});

  var SubjectsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code : { type: String, required: true },
  yearlevel : { type: Number, required: true },
});

    var SubjectSchedSchema = new mongoose.Schema({
  code: { type: String, required: true },
  max : { type: Number, required: true },
  schedule : { type: String, required: true },
});

    var EnrolledStudentSchema = new mongoose.Schema({
  user: { type: String, required: true , ref : 'User'},

});

var User = mongoose.model('User', UserSchema);
var Subjects = mongoose.model('Subjects', SubjectsSchema);

var EnrolledStudent = mongoose.model('EnrolledStudent', EnrolledStudentSchema);


app.post('/create', function(req, res) {
    console.log("server.create running");

    User.create({ email: req.body.email, user: req.body.user, password : req.body.password, admin: true, }, function(err, data){
    if(err) 
    {
    	console.log(err);
}
    else {
    console.log(data);
   res.json(data)
    }
})
});

app.post('/createsubject', function(req, res) {
    console.log("server.create running");

    Subjects.create({ name: req.body.name, code: req.body.code, yearlevel : req.body.yearlevel }, function(err, data){
    if(err) 
    {
      console.log(err);
}
    else {
    console.log(data);
   res.json(data)
    }
})
});

app.post('/getsubjects', function(req, res) {
    console.log("server getusers running");
 Subjects.find({}, function(err, data) {
console.log(data)
      res.json(data);
})    
});
app.post('/getsubjectschedule', function(req, res) {
 
console.log(req.body.code)
    var SubjectSchedule = mongoose.model(req.body.code, SubjectSchedSchema);
 SubjectSchedule.find({}, function(err, data) {
console.log(data)
      res.json(data);
})    
});

app.post('/createsubjectschedule', function(req, res) {
    var SubjectSchedule = mongoose.model(req.body.code, SubjectSchedSchema);
     SubjectSchedule.create({ code: req.body.code, max: req.body.max, schedule : req.body.schedule }, function(err, data){
    if(err) 
    {
      console.log(err);
}
    else {
    console.log(data);
   res.json(data)
    }
})
});


app.post('/users', function(req, res) {
     User.find({}, function(err, data) {

console.log(data)
     
   
      res.json(data);
})    
      // User.remove({}, function (err){
      //   if(err){
      //     console.log("failed")
      //   }
      // })  
  });

app.post('/login', function(req, res) {

  console.log(req.body.user)
  console.log(req.body.password)
    User.findOne({user: req.body.user }, function(err, user) {
  if (err){
console.log("failed")
  }else{

if(user){
    
    if(user.password != req.body.password){
       res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    }
    else{
         res.json({ success: true, message: 'Authentication Succeed.' });   
    }
 }else{
 res.json({ success: false, message: 'Authentication failed. User not found.' });
 }
}
});
  });   



  

app.listen(port);
console.log('server is running')


