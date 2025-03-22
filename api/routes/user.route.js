const express = require("express");

const userController = require("../controller/user.controller.js.js");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);
router.route("/:id").get(userController.getUserById);

module.exports = router;
