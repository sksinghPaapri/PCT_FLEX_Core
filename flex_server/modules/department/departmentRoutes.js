const express = require('express');
const departmentController = require('./departmentController');
const authController = require('../appAuth/authController')

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/list')
    .get(departmentController.getList)


router.route('/')
    .get(departmentController.getAll)
    .post(departmentController.createOne)

router.route('/:id')
    .get(departmentController.getOne)
    .patch(departmentController.updateOne)
    .delete(departmentController.deleteOne)

module.exports = router;

