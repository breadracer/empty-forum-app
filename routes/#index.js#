var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();

//===========================
// Auth Routes
//===========================

// Register
router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err)
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    });
  });
});

// Login
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req, res){});

// Logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

//===========================
// Index Routes
//===========================

// index
router.get("/", function(req, res){
  if(req.isAuthenticated()){
    res.render("index") ;
  } else {
    res.render("start");
  }
});

// Star route
router.get("*", function(req, res){
  res.send("Cannot get the page");
});


module.exports = router;
