const router = require("express").Router();
const userRoutes = require("./user-routes");

// add prefix /users to reflect user-routes.js

router.use("/users", userRoutes);

module.exports = router;