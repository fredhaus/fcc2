const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: String,
  hashTags: [{type: String}],
  mentions: [{type: String}],
  text: String,
  timestamp: Number,
  id: {type: String, required: true, unique: true},
  userId: {type: String, required: true}
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment