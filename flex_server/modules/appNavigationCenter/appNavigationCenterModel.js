const mongoose = require("mongoose");



// FIELDS ARE >>>
const appNavigationCenterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Please enter name.']
        },
        navigationCenterId: {
            type: String,
            unique: true,
            required: [true, 'Please enter Navigation Center Id']
        },
        baseRoute: String,
        type: {
            type: String,
            enum: ['STANDARD', 'CUSTOM'],
            default: 'CUSTOM'
        },
        navigations: [{
            navigationType: {
                type: String,
                required: true,
                enum: ['AppNavigationLink', 'AppNavigationCategory']
            },
            navigation: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "navigations.navigationType"
            }
        }]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);


const AppNavigationCenter = mongoose.model("AppNavigationCenter", appNavigationCenterSchema);
module.exports = AppNavigationCenter;