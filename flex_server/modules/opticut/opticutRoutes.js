const express = require('express');
const opticutController = require('./opticutController');

const router = express.Router();


router.route('/')
    .get(opticutController.opticut)
    .post(opticutController.optimize)

// router.route('/:id')
//     .get(opticutController.getOne)
//     .patch(opticutController.updateOne)
//     .delete(opticutController.deleteOne)

module.exports = router;

