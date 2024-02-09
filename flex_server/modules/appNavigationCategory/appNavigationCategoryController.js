const AppNavigationCategory = require('./appNavigationCategoryModel');
const factory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');


exports.getAll = factory.getAll(AppNavigationCategory, [{ path: 'navigationItems', select: 'id, name' }]);
exports.getOne = factory.getOne(AppNavigationCategory, [{ path: 'navigationItems', select: 'id name' }]);
exports.createOne = factory.createOne(AppNavigationCategory);
exports.updateOne = factory.updateOne(AppNavigationCategory);
exports.deleteOne = factory.deleteOne(AppNavigationCategory);

exports.list = catchAsync(async (req, res, next) => {

    const documents = await AppNavigationCategory.find().select('id name').sort({ name: 1 })

    res.status(200).json({
        isSuccess: true,
        status: "success",
        documents: documents,
    });
});