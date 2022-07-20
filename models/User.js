const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    // basic date created at, username, email, password/
    createdAt: {
      type: Date,
      default: Date.now,
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
