const mongoose = require('mongoose')
const CustomDocumentType = require('../../customDocumentType/customDocumentTypeModel')
const catchAsync = require('../../../utils/catchAsync');
const netsuiteCRUDService = require('../service/netsuiteCRUDService');

const formatData = (data, schema) => {
    const formattedData = {};

    // Add erpRecordId from schema to formatted data
    formattedData.recordtype = schema.erpRecordId;


    schema.customFields.forEach(field => {
        const dataFieldId = field.fieldId;
        const erpFieldId = field.erpFieldId;

        if (data[dataFieldId] !== undefined) {
            formattedData[erpFieldId] = data[dataFieldId];
        } else {
            formattedData[erpFieldId] = ''; // Set default value if field is not present in the data
        }
    });

    return formattedData;
}

exports.updateOne = catchAsync(async (req, res) => {

    console.log(req.body);

    const document = await CustomDocumentType.findById(req.params.id);
    const data = formatData(req.body, document)
    const response = await netsuiteCRUDService.upsertOne(data)
    console.log(response)
    if (!response.isSuccess)
        return next(new AppError('The NetSuite-Sync is currently experiencing issues. Kindly reach out to the administrator for assistance.', 404));

    const documentSchema = mongoose.Schema(
        {
            name: String
        },
        {
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
            timestamps: true,
            strict: false
        })

    const Model = mongoose.models[`${document.modelName}`] || mongoose.model(`${document.modelName}`, documentSchema);

    const customDoc = await Model.findByIdAndUpdate(req.body.id, { flex_netsuite_id: response.data.recordId }, {
        new: true,
        runValidators: true
        // __user: req.user ? { name: req.user.name, _id: req.user._id } : 'Unknown'
    });



    res.status(200).json({
        isSuccess: true,
        status: "success",
        document: customDoc,
    });
});

exports.deleteOne = catchAsync(async (req, res) => {

    console.log(req.body);


    res.status(200).json({
        isSuccess: true,
        status: "success",
        document: req.body,
    });
});
