const mongoose = require("mongoose");
const validator = require("validator");


const customDocumentTypeSchema = mongoose.Schema({
    modelName: String,
    navigationCenterId: mongoose.Schema.Types.ObjectId,
    appCenterId: mongoose.Schema.Types.ObjectId,
    color: String,
    backgroundColor: String,
    documentTypeName: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please enter Custom Document Type Name.']
    },
    documentTypeId: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please enter Custom Document Type Id.'],
        lowercase: true
    },
    erpRecordId: String,
    documentTabs: [{
        label: {
            type: String
        },
        tabId: {
            type: String,
            lowercase: true
        },
        tabType: {
            type: String,
            enum: ['Line', 'Block'],
            default: 'Block'
        }
    }],
    customFields: [{
        label: String,
        fieldId: String,
        erpFieldId: String,
        description: String,
        validationMessage: {
            type: String,
            required: function () {
                return this.required === true;
            },
            trim: true
        },
        type: {
            type: String,
            enum: ['String', 'Long String', 'Number', 'Date', 'Boolean', 'App', 'Decimal', 'WYSIWYGEditor'],
            default: 'String'
        },
        required: {
            type: Boolean,
            default: false
        },
        defaultValue: mongoose.Schema.Types.Mixed,
        selectRecordType: {
            type: String,
            required: function () {
                return this.type === 'App';
            }
        },
        displayType: {
            type: String,
            enum: ['Normal', 'Disabled', 'Hidden'],
            default: 'Normal'
        },
        displayLocation: {
            type: String,
            default: 'Body'
        }
    }]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})



customDocumentTypeSchema.pre('save', async function (next) {
    this.modelName = this.documentTypeName.replace(/\s/g, "");
    next();
});


const CustomDocumentType = mongoose.model("CustomDocumentType", customDocumentTypeSchema);
module.exports = CustomDocumentType;
