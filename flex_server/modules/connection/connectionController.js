const Connection = require('./connectionModel');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlerFactory/handlerFactory');


exports.getAll = factory.getAll(Connection);
exports.getOne = factory.getOne(Connection);
exports.createOne = factory.createOne(Connection);
exports.updateOne = factory.updateOne(Connection);
exports.deleteOne = factory.deleteOne(Connection);

exports.list = catchAsync(async (req, res, next) => {

    const documents = await Connection.find().select('id name').sort({ name: 1 })

    res.status(200).json({
        isSuccess: true,
        status: "success",
        documents: documents,
    });
});
