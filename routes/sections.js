var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var Section = require("../models/section");
var bodyParser = require("body-parser");
var Post = require("../models/post");
var router = express.Router();


// INDEX
router.get("/", function(req, res){
  Section.find({}, function(err, sections){
    res.render("sections/index", {sections: sections});
  });
});

// SHOW
router.get("/:sectionId", function(req, res){
  Section.findById(req.params.sectionId).populate("posts").exec(function(err, section){
    res.render("sections/show", {section: section});
  });
});

// CREATE
router.post("/:sectionId", function(req, res){
  Post.create(req.post, function(err, post){
    if(err){
      console.log(err);
    }
    Section.findById(req.params.sectionId).populate("posts").exec(function(err, section){
      section.posts.push(post);
      section.save();
      res.redirect("/sections/" + req.params.sectionId);      
    });
  });
});

module.exports = router;
