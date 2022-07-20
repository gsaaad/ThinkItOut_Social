const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughtText: {
      type: String,
      require: true,
      trim: true,
    },
    reactions: [],
    reactionsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
