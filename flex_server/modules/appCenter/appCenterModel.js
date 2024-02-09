const mongoose = require('mongoose');

const appCenterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Please enter name.']
        },
        abbreviation: String,
        link: String,
        color: {
            type: String,
            default: '#009999'
        },
        backgroundColor: {
            type: String,
            default: '#009999'
        },
        iconName: String,
        navCenterLink: mongoose.Schema.Types.ObjectId,
        docType: mongoose.Schema.Types.ObjectId,
        permission: mongoose.Schema.Types.ObjectId,
        permissionCode: {
            type: String,
            default: "ALL_MICRO_APP",
            select: false
        },
        isInactive: {
            type: Boolean,
            default: false
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
)

const AppCenter = mongoose.model('AppCenter', appCenterSchema);
module.exports = AppCenter;