const express = require('express');
const AppCenter = require('./appCenterModel')
const appCenterController = require('./appCenterController');
const authController = require('../appAuth/authController')


const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/list')
    .get(appCenterController.getList)


router.route('/')
    .get(appCenterController.getAll)
    .post(appCenterController.createOne);

router.route('/:id')
    .get(appCenterController.getOne)
    .patch(appCenterController.updateOne)
    .delete(appCenterController.deleteOne)

module.exports = router;