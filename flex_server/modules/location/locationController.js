const Location = require('./locationModel')
const handlerFactory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync')

exports.getAll = handlerFactory.getAll(Location);
exports.getOne = handlerFactory.getOne(Location);
exports.createOne = handlerFactory.createOne(Location);
exports.updateOne = handlerFactory.updateOne(Location);
exports.deleteOne = handlerFactory.deleteOne(Location);

exports.getList = catchAsync(async (req, res) => {
    const docs = await Location.find().select('id name');
    res.status(200).json({
        isSuccess: true,
        status: "success",
        results: docs.length,
        documents: docs,
    });
});


