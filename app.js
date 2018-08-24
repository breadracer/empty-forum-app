/*
   THE EMPTY FORUM APP
   Basic elements:
   1.sections
   2.posts
   3.comments
   4.sub-comments
 */
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var User = require("./models/user");
var Comment = require("./models/comment");
var Post = require("./models/post");
var Section = require("./models/section");

var indexRoutes = require("./routes/index");

var seedDB = require("./seeds");

var app = express();

mongoose.connect("mongodb://localhost/forum");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//===========================
// Passport Configuration
//===========================

app.use(require("express-session")({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========================
// Other Configuration
//===========================

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

seedDB();

app.use(indexRoutes);

app.listen(3010, "localhost", function(){
  console.log("Forum server started on port 3010");
});

//===================
// Functions
//===================

function loginCheck(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
