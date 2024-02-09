const Permission = require('./permissionModel')
const handlerFactory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');

exports.getAll = handlerFactory.getAll(Permission);
exports.getOne = handlerFactory.getOne(Permission);
exports.createOne = handlerFactory.createOne(Permission);
exports.updateOne = handlerFactory.updateOne(Permission);
exports.deleteOne = handlerFactory.deleteOne(Permission);

exports.getList = catchAsync(async (req, res, next) => {

    const docs = await Permission.find().select("id name").sort({ name: 1 })
    res.status(200).json({
        isSuccess: true,
        status: 'success',
        results: docs.length,
        documents: docs
    })
})






