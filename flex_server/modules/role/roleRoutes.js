const express = require('express');
const roleController = require('./roleController');

const router = express.Router();

router.route('/list')
    .get(roleController.getList)

router.route('/')
    .get(roleController.getAll)
    .post(roleController.createOne)

router.route('/:id')
    .get(roleController.getOne)
    .patch(roleController.updateOne)
    .delete(roleController.deleteOne)

module.exports = router;

