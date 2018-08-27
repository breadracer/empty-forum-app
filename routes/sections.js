var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var Section = require("../models/section")
var router = express.Router();

router.get("/", function(req, res){
  Section.find({}, function(err, sections){
    res.render("sections/index", {sections: sections});
  });
});

router.get("/:sectionId", function(req, res){
  Section.findById(req.params.sectionId).populate("posts").exec(function(err, section){
    res.render("sections/show", {section: section});
  });
});

module.exports = router;
