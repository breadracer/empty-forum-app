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
<<<<<<< HEAD
=======
  },
  {
    name: "Delta",
    password: "fourth"
>>>>>>> cd9907e80edf549a75e4fe646cc83c097d72f231
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
<<<<<<< HEAD
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
	  
	  
=======
		  createSections();
		}
  });
});
	  }

	  function createSections(){
	    var counterSection = 0;
	    sectionData.forEach(function(sectionName, i){
	      Section.create({name: sectionData[i]}, function(err, newSection){
		if(err){
		  console.log(err);
		}
		console.log("Created a new section named", newSection.name);
		counterSection++;
		if(counterSection === sectionData.length){
		  createPosts();
		}
  });
});

	    function createPosts(){
	      var counterPost = 0;
	      postData.forEach(function(postGroup, i){
		postGroup.forEach(function(post, j){
		  Post.create(post, function(err, newPost){
		    if(err){
		      console.log(err);
		    }
		    console.log("Created a new post named", newPost.name);
		  });
		});
		counterPost++;
		if(counterPost === postData.length){
		  associate();
		}
  });
	    }

	    function associate(){

	    }
	    /* sectionData.forEach(function(sectionName, i){
	       Section.create({name: sectionData[i]}, function(err, newSection){
	       if(err){
	       console.log(err)
	       } else {
	       console.log("Added a new section!")
	       var newPosts = []
	       var counterPost = 0
	       postData[i].forEach(function(post){
	       Post.create(post, function(err, newPost){
	       if(err){
	       console.log(err)
	       }
	       newPosts.push(newPost)
	       console.log("Added a new post!")
	       })
	       counterPost++
	       if(counterPost === postData[i].length - 1){
	       console.log(newPosts)
	       callBackPost()
	       }
	       })

	       function callBackPost(){
	       console.log(newPosts)
	       newSection.posts.concat(newPosts)
	       newSection.save(function(err, section){
	       if(err){
	       console.log(err)
	       } else {
	       //			console.log(section)
	       }
	       })

	       }
	       }
	       })
	       }) */
	  }

>>>>>>> cd9907e80edf549a75e4fe646cc83c097d72f231
	})
      })
    })
  })
}

module.exports = seedDB;
