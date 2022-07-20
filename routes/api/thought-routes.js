const router = require("express").Router();

const {
  addThought,
  removeThought,
} = require("../../controllers/thought-controller");

// add thought
router.route(":userId").post(addThought);

// remove thought, you need user id and the matched thought id
router.route(":userId/:thoughtId").delete(removeThought);

module.exports = router;
