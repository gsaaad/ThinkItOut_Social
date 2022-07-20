const router = require("express").Router();

const {
  getAllThoughts,
  addThought,
  removeThought,
} = require("../../controllers/thought-controller");

// get all thoughts
router.route("/").get(getAllThoughts);

// add thought
router.route("/:userId").post(addThought);

// remove thought, you need user id and the matched thought id
router.route("/:userId/:thoughtId").delete(removeThought);

module.exports = router;
