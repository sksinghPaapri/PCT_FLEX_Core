const mongoose = require('mongoose')
const axios = require('axios');
const Employee = require("./employeeModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const diffHistory = require('../plugins/MongooseHistory')

exports.employeeList = catchAsync(async (req, res) => {
    const employees = await Employee.find().select('id name');
    res.status(200).json({
        isSuccess: true,
        status: "success",
        results: employees.length,
        documents: employees,
    });
});

exports.getAllEmployee = catchAsync(async (req, res) => {

    // res.status(200).json(employees);
    try {
        const employees = await Employee.find();
        res.status(200).json({
            isSuccess: true,
            status: "success",
            results: employees.length,
            documents: employees,
        });

    } catch (error) {
        console.log(error);
    }
});

exports.createOne = catchAsync(async (req, res, next) => {
    console.log("Create One"); // Remove default one
    if (!req.body.password) {
        req.body.password = "paapri@123";
        req.body.passwordConfirm = "paapri@123";
    }

    const response = await axios.post(`${process.env.AUTH_BASE_URL}/server/api/v1/accesscontrol/signup`, {
        flexId: req.user.flexId,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        giveAccess: req.body.giveAccess
    })

    console.log(response.data);


    req.body.flexId = req.user.flexId;

    const doc = await Employee.create(req.body);
    res.status(201).json({
        isSuccess: true,
        status: "success",
        results: doc.length,
        document: doc,
    });
});

exports.getOne = catchAsync(async (req, res, next) => {
    let query = Employee.findById(req.params.id);
    const doc = await query;

    if (!doc) {
        return next(new AppError("No document found with the ID", 404));
    }
    res.status(200).json({
        isSuccess: true,
        status: "success",
        results: doc.length,
        document: doc,
    });
});

exports.updateOne = catchAsync(async (req, res, next) => {
    if (!req.body.password) {
        delete req.body.password;
        delete req.body.passwordConfirm;
    }

    console.log(req.user);

    if (
        (req.body.giveAccess && req.user.roles?.length > 0) ||
        (!req.body.giveAccess && req.user.roles?.length > 0)
    ) {
        const doc = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: false,
            runValidators: false,
            __user: req.user ? { name: req.user.name, _id: req.user._id } : 'System Information'
        });

        if (doc) {
            const response = await axios.patch(`${process.env.AUTH_BASE_URL}/server/api/v1/accesscontrol/update`, {
                flexId: req.user.flexId,
                email: req.body.email,
                giveAccess: req.body.giveAccess

            })

        }
        // const audit = await Audit.create({ user: req.user.id })
        if (!doc) {
            return next(new AppError("No document found with the ID", 404));
        }
        res.status(200).json({
            isSuccess: true,
            status: "success",
            // results: doc.length,
            document: doc,
        });
    } else {
        return next(new AppError("Please select some role.", 404));
    }
});

exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await Employee.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError("No document found with the ID", 404));
    }
    res.status(204).json({
        isSuccess: true,
        status: "success",
    });
});


exports.getHistories = catchAsync(async (req, res) => {

    const doc = await Employee.findById(req.params.id);

    if (!doc)
        return next(
            new AppError(
                'Document not found!',
                400
            ));

    const historiesDoc = await diffHistory.getDiffs("Employee", doc._id, []);

    res.status(200).json({
        isSuccess: true,
        status: 'success',
        results: historiesDoc.length,
        documents: historiesDoc
    });
});