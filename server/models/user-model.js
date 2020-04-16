const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
  name: String,
  githubId: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
