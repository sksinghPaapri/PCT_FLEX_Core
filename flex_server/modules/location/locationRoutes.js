const express = require('express');
const locationController = require('./locationController');

const router = express.Router();


router.route('/list')
    .get(locationController.getList)

router.route('/')
    .get(locationController.getAll)
    .post(locationController.createOne)

router.route('/:id')
    .get(locationController.getOne)
    .patch(locationController.updateOne)
    .delete(locationController.deleteOne)

module.exports = router;

