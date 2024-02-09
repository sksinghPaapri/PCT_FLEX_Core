const AppCenter = require('./appCenterModel');
const Employee = require('../employee/employeeModel');
const factory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');



//exports.getAll = factory.getAll(AppCenter);

exports.getAll = catchAsync(async (req, res, next) => {


    const aggregate = Employee.aggregate([
        {
            $match: {
                '_id': req.user._id
            }
        },
        {
            $unwind: {
                path: '$roles',
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roles.id',
                foreignField: '_id',
                as: 'roleResults'
            }
        },
        {
            $unwind: {
                path: '$roleResults',
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: '$roleResults.appPermissions',
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                appPermissions: {
                    $addToSet: '$roleResults.appPermissions.code'
                }
            }
        }
    ])

    const aggResults = await aggregate;

    const docs = await AppCenter.find({ permissionCode: { $in: aggResults[0]?.appPermissions } }).sort({ name: 1 });


    res.status(200).json({
        isSuccess: true,
        status: 'success',
        results: docs.length,
        documents: docs
    })
})
exports.getOne = factory.getOne(AppCenter);
exports.createOne = factory.createOne(AppCenter);
exports.updateOne = factory.updateOne(AppCenter);
exports.deleteOne = factory.deleteOne(AppCenter);

exports.getList = catchAsync(async (req, res, next) => {

    const docs = await AppCenter.find({ isInactive: false }).select("name permissionCode").sort({ name: 1 })
    res.status(200).json({
        isSuccess: true,
        status: 'success',
        results: docs.length,
        documents: docs
    })
})