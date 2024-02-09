const express = require('express');
const permissionController = require('./permissionController');

const router = express.Router();

router.route('/list')
    .get(permissionController.getList)

router.route('/')
    .get(permissionController.getAll)
    .post(permissionController.createOne)

router.route('/:id')
    .get(permissionController.getOne)
    .patch(permissionController.updateOne)
    .delete(permissionController.deleteOne)

module.exports = router;

