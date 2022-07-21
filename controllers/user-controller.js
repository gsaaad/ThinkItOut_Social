const { User, Thought } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
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
        res.status(400).json(err);
      });
  },
  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // update user by id
  updateUserById({ params, body }, res) {
    // new:true = don't send back the original, return ta new version of the updated document
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(400)
            .json({ message: "There's no user with this id.. Try Again!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // delete user by id and their documents?
  deleteUserById({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({ message: "There's no user with this id" });
          return;
        }
        res.json(dbUserData);
        // Thought.find({})
        //   .deleteMany({ _id: params.userId })
        //   .then((deletedData) => {
        //     res.json(deletedData);
        //   });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // ADD friend

  addFriend({ params }, res) {
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.id } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "There's no user with this id..Try again!" });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // REMOVE friend
  removeFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.friendId })
      .then((deletedFriend) => {
        if (!deletedFriend) {
          res
            .status(404)
            .json({ message: "There's no friend with this id..Try again!" });
          return;
        }
        return User.findOneAndUpdate(
          { id: params.friendId },
          { $pull: { friends: params.friendId } },
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
        res.json(err);
      });
  },
};

module.exports = userController;
