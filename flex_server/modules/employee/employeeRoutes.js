const express = require("express");
const employeeController = require("./employeeController");
const authController = require("../appAuth/authController");


// ROUTES
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/authLogin", authController.authLogin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware

router.patch(
    "/updateMyPassword",
    authController.oldprotect,
    authController.updatePassword
);

// Protect all routes after this middleware
router.use(authController.protect);

router.route("/list").get(employeeController.employeeList);



router
    .route("/")
    .get(employeeController.getAllEmployee)
    .post(employeeController.createOne);

router
    .route("/:id")
    .get(employeeController.getOne)
    .patch(employeeController.updateOne)
    .delete(employeeController.deleteOne);

router
    .route('/:id/histories')
    .get(employeeController.getHistories);

// router.route('/logout').get(authController.logout);
module.exports = router;