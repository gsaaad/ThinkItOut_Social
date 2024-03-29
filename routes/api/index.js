const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// add prefix /users to reflect user-routes.js

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
