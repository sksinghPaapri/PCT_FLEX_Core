const express = require("express");
const appNavigationCategoryController = require("./appNavigationCategoryController");
const authController = require("../appAuth/authController");

// ROUTES
const router = express.Router();

// Public Routes
// Role Specified Routes
router.use(authController.protect);

router
    .route("/list")
    .get(appNavigationCategoryController.list)


router
    .route("/")
    .get(appNavigationCategoryController.getAll)
    .post(appNavigationCategoryController.createOne);

router
    .route("/:id")
    .get(appNavigationCategoryController.getOne)
    .patch(appNavigationCategoryController.updateOne)
    .delete(appNavigationCategoryController.deleteOne);

module.exports = router;
