const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const UserSchema = new Schema(
  {
    // basic date created at, username, email, password/
    createdAt: {
      type: Date,
      default: DateTime.now(),
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Invalid Email address, Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,

        ref: "User",
      },
    ],

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  // since its array, get me this schema's friends array
  return this.friends.length;
});
const User = model("User", UserSchema);

module.exports = User;
