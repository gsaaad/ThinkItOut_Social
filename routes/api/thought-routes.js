const router = require("express").Router();

const {
  getAllThoughts,
  addThought,
  addReaction,
  removeThought,
  removeReaction,
} = require("../../controllers/thought-controller");

// get all thoughts
router.route("/").get(getAllThoughts);

// add thought
router.route("/:userId").post(addThought);

// remove thought, you need user id and the matched thought id
router.route("/:userId/:thoughtId").put(addReaction).delete(removeThought);

// remove reaction

router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
