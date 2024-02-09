const express = require('express');
const appNavigationCenterController = require('./appNavigationCenterController');


// ROUTES 
const router = express.Router();

// Public Routes
// Role Specified Routes
// router.use(authController.restrictTo('admin', 'lead-guide'));
// /query?navigationCenterType=Employee
router.route('/query')
    .get(appNavigationCenterController.getByCenterId)



router.route('/')
    .get(appNavigationCenterController.getAll)
    .post(appNavigationCenterController.createOne);


router.route('/:id')
    .get(appNavigationCenterController.getOne)
    .patch(appNavigationCenterController.updateOne)
    .delete(appNavigationCenterController.deleteOne);

module.exports = router