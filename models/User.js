const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  // basic date created at, username, email, password/
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = model("User", UserSchema);

module.exports = User;
