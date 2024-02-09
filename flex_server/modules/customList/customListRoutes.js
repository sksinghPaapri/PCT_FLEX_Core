const express = require('express');
const customListController = require('./customListController');
const authController = require('../appAuth/authController')

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);


router.route('/')
    .get(authController.restrictTo('CUSTOM_LIST'), customListController.getAll)
    .post(customListController.createOne)

router.route('/:id')
    .get(customListController.getOne)
    .patch(customListController.updateOne)
    .delete(customListController.deleteOne)

module.exports = router;

