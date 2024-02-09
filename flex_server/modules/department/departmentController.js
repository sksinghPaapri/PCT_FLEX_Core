const Department = require('./departmentModel')
const handlerFactory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync')

exports.getAll = handlerFactory.getAll(Department);
exports.getOne = handlerFactory.getOne(Department);
exports.createOne = handlerFactory.createOne(Department);
exports.updateOne = handlerFactory.updateOne(Department);
exports.deleteOne = handlerFactory.deleteOne(Department);

exports.getList = catchAsync(async (req, res) => {
    const docs = await Department.find().select('id name');
    res.status(200).json({
        isSuccess: true,
        status: "success",
        results: docs.length,
        documents: docs,
    });
});

