const { Thought, User } = require("../models");

const thoughtController = {
  addThought({ params, body }, res) {
    // this is the body of a thought
    console.log(body);
    // create thought, take this thought's id and push/link to User model
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: params.userId },
          //   thoughts array, add id
          { $push: { thoughts: _id } },
          //   new means give us an updated version of the document (NOSQL)
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "There's no user with this id.. Try again!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  removeThought({ params }, res) {
    Thought.FindOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          res
            .status(404)
            .json({ message: "There's no thought with this id.. Try again!" });
          return;
        }
        return User.findOneAndUpdate(
          { id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "There's no user found with this id.. Try again!",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
S;
module.exports = thoughtController;
