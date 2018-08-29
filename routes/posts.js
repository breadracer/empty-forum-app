var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var Post = require("../models/post")

// SHOW
router.get("/:postId", function(req, res){
  Post.findById(req.params.postId).populate("comment").exec(function(err, post){
    res.render("posts/show", {post: post});
  });
});


module.exports = router;
