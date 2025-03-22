const express = require("express");

const propertyController = require("../controller/property.controller");

const router = express.Router();

router
  .route("/")
  .get(propertyController.getAllProperty)
  .post(propertyController.createProperty);
router
  .route("/:id")
  .get(propertyController.getPropertyDetail)
  .put(propertyController.updateProperty)
  .delete(propertyController.removeProperty);

module.exports = router;
