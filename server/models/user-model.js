const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
  name: String,
  githubId: String,
});

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, (err, result) => {
      return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  })
 };

const User = mongoose.model("user", userSchema);

module.exports = User;
