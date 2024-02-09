const express = require('express');
const netsuiteCRUDController = require('../controllers/netsuiteCRUDController');

const router = express.Router();

// router.route('/')
//     .post(netsuiteCRUDController.updateOne)

router.route('/:id')
    .patch(netsuiteCRUDController.updateOne)
    .delete(netsuiteCRUDController.deleteOne)

module.exports = router;

