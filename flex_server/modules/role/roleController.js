const Role = require('./roleModel')
const handlerFactory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');

exports.getAll = handlerFactory.getAll(Role);
exports.getOne = handlerFactory.getOne(Role);
exports.createOne = handlerFactory.createOne(Role);
exports.updateOne = handlerFactory.updateOne(Role);
exports.deleteOne = handlerFactory.deleteOne(Role);

exports.getList = catchAsync(async (req, res) => {
    const docs = await Role.find().select('id name');
    res.status(200).json({
        isSuccess: true,
        status: "success",
        results: docs.length,
        documents: docs,
    });
});

