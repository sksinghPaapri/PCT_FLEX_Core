const express = require('express');
const connectionController = require('./connectionController');
const authController = require('../appAuth/authController')

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);


router.route('/')
    .get(connectionController.getAll)
    .post(connectionController.createOne)

router.route('/:id')
    .get(connectionController.getOne)
    .patch(connectionController.updateOne)
    .delete(connectionController.deleteOne)

module.exports = router;

