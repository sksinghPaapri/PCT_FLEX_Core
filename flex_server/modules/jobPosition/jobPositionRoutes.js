const express = require('express');
const jobPositionController = require('./jobPositionController');

const router = express.Router();

router.route('/list')
    .get(jobPositionController.getList)

router.route('/')
    .get(jobPositionController.getAll)
    .post(jobPositionController.createOne)

router.route('/:id')
    .get(jobPositionController.getOne)
    .patch(jobPositionController.updateOne)
    .delete(jobPositionController.deleteOne)

module.exports = router;

