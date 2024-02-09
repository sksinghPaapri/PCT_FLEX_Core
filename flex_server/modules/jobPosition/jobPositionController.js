const JobPosition = require('./jobPositionModel')
const handlerFactory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');

exports.getAll = handlerFactory.getAll(JobPosition);
exports.getOne = handlerFactory.getOne(JobPosition);
exports.createOne = handlerFactory.createOne(JobPosition);
exports.updateOne = handlerFactory.updateOne(JobPosition);
exports.deleteOne = handlerFactory.deleteOne(JobPosition);

exports.getList = catchAsync(async (req, res) => {
    const docs = await JobPosition.find().select('id name');
    res.status(200).json({
        isSuccess: true,
        status: "success",
        results: docs.length,
        documents: docs,
    });
});


