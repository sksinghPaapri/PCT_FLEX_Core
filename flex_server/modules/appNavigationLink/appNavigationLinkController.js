const AppNavigationLink = require('./appNavigationLinkModel');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlerFactory/handlerFactory');


exports.getAll = factory.getAll(AppNavigationLink);
exports.getOne = factory.getOne(AppNavigationLink);
exports.createOne = factory.createOne(AppNavigationLink);
exports.updateOne = factory.updateOne(AppNavigationLink);
exports.deleteOne = factory.deleteOne(AppNavigationLink);

exports.list = catchAsync(async (req, res, next) => {

    const documents = await AppNavigationLink.find().select('id name').sort({ name: 1 })

    res.status(200).json({
        isSuccess: true,
        status: "success",
        documents: documents,
    });
});
