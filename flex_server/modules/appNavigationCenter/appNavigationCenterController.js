const AppNavigationCenter = require('./appNavigationCenterModel');
const factory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAll = factory.getAll(AppNavigationCenter, [{
    path: 'navigations.navigation',
    select: 'id name label baseRoute',
    populate: { path: 'navigationItems', select: 'id label name baseRoute', options: { strictPopulate: false } }
}]);
exports.getOne = factory.getOne(AppNavigationCenter, [{
    path: 'navigations.navigation',
    select: 'id name label baseRoute',
    populate: { path: 'navigationItems', select: 'id label name baseRoute', options: { strictPopulate: false } }
}]);
exports.createOne = factory.createOne(AppNavigationCenter);
exports.updateOne = factory.updateOne(AppNavigationCenter);
exports.deleteOne = factory.deleteOne(AppNavigationCenter);


exports.getByCenterId = catchAsync(async (req, res, next) => {

    console.log(req.query);

    const document = await AppNavigationCenter.findOne({ navigationCenterId: req.query.navigationCenterId }).populate([{
        path: 'navigations.navigation',
        select: 'id name label baseRoute',
        populate: { path: 'navigationItems', select: 'id name label baseRoute', options: { strictPopulate: false } }
    }]);

    res.status(200).json({
        isSuccess: true,
        status: "success",
        document: document,
    });
});