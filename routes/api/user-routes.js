const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../../controllers/user-controller");
// get all and post at /api/pizzas

router.route("/").get(getAllUsers).post(createUser);

// get one, get one and update, get one and delete

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
