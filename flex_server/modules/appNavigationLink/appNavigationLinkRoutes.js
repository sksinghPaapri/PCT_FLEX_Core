const express = require("express");
const appNavigationLinkController = require("./appNavigationLinkController");
const authController = require("../appAuth/authController");

// ROUTES
const router = express.Router();

// Public Routes
// Role Specified Routes
// router.use(authController.protect);

router.route("/list").get(appNavigationLinkController.list);

router
  .route("/")
  .get(appNavigationLinkController.getAll)
  .post(appNavigationLinkController.createOne);

router
  .route("/:id")
  .get(appNavigationLinkController.getOne)
  .patch(appNavigationLinkController.updateOne)
  .delete(appNavigationLinkController.deleteOne);

module.exports = router;
