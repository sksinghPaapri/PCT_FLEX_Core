const CustomList = require('./customListModel')
const handlerFactory = require('../handlerFactory/handlerFactory');

exports.getAll = handlerFactory.getAll(CustomList);
exports.getOne = handlerFactory.getOne(CustomList);
exports.createOne = handlerFactory.createOne(CustomList);
exports.updateOne = handlerFactory.updateOne(CustomList); 
exports.deleteOne = handlerFactory.deleteOne(CustomList);


