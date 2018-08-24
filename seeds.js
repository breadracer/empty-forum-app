var mongoose = require("mongoose");
var Section = require("./models/section");
var Post = require("./models/post");
var Comment = require("./models/comment");
var User = require("./models/user");

var userData = [
  {
    name: "Alpha",
    password: "first"
  },
  {
    name: "Bravo",
    password: "second"
  },
  {
    name: "Charlie",
    password: "third"
  }
];

var commentData = [];

var postData = [
  [
    {
      name: "BK is the best!",
      content: "Because it is the best!"
    },
    {
      name: "BK is ok!",
      content: "Because it is ok!"
    },
    {
      name: "BK is the worst!",
      content: "Because it is the worst!"
    }
  ],
  [
    {
      name: "MCD is the best!",
      content: "Because it is the best!"
    },
    {
      name: "MCD is ok!",
      content: "Because it is ok!"
    },
    {
      name: "MCD is the worst!",
      content: "Because it is the worst!"
    }
  ],
  [
    {
      name: "INO is the best!",
      content: "Because it is the best!"
    },
    {
      name: "INO is ok!",
      content: "Because it is ok!"
    },
    {
      name: "INO is the worst!",
      content: "Because it is the worst!"
    }
  ]
];

var sectionData = ["Burger King", "McDonald", "In-N-Out"];

function seedDB(){
  Comment.remove({}, function(err){
    if(err){
      console.log(err);
    }
    Post.remove({}, function(err){
      if(err){
	console.log(err);
      }
      Section.remove({}, function(err){
	if(err){
	  console.log(err);
	}
	User.remove({}, function(err){
	  if(err){
	    console.log(err);
	  }
	  console.log("Cleared the database!");
	  createUsers();

	  function createUsers(){
	    var counterUser = 0;
	    userData.forEach(function(user){
	      User.register({username: user.name}, user.password, function(err, newUser){
		if(err){
		  console.log(err);
		}
		console.log("Registered a new user named", newUser.username);
		counterUser++;
		if(counterUser === userData.length){
		  createSections(0);
		}
	      });
	    });
	  }

	  function createSections(i){
	    Section.create({name: sectionData[i]}, function(err, newSection){
	      if(err){
		console.log(err);
	      }
	      console.log("Created a new section named", newSection.name);
	      createPosts(i, 0, newSection);
	      if(++i !== sectionData.length){
		setTimeout(createSections.bind(this, i), 10);
	      }
	    })
	  }

	  function createPosts(i, j, newSection){
	    Post.create(postData[i][j], function(err, newPost){
	      if(err){
		console.log(err);
	      }
	      console.log("Created a new post named", newPost.name);
	      newSection.posts.push(newPost);
	      newSection.save(function(err, savedSection){
		if(err){
		  console.log(err);
		}
		console.log("Saved the post!");
	      })
	      if(++j != postData[i].length){
		setTimeout(createPosts.bind(this, i, j, newSection), 10);
	      }
	    })
	  }
	  
	  
	})
      })
    })
  })
}

module.exports = seedDB;
