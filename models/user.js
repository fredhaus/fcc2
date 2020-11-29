const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  contact: {
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, index: { unique: true, sparse: true }} //unique, unless undefined
  },
  id: {type: String, required: true, unique: true},
  profilePictureUrl: String,
  updatedAt: Number, 
  username: {type: String, required: true}
});


const User = mongoose.model('User', userSchema);
module.exports = User;




