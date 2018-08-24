var mongoose = require("mongoose");

var sectionSchema = new mongoose.Schema({
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

module.exports = mongoose.model("Section", sectionSchema);
