const mongoose = require("mongoose");


const schema = mongoose.Schema(
    {
        label: {
            type: String,
            required: [true, 'Please enter label']
        },
        name: {
            type: String,
            unique: true,
            required: [true, 'Please enter name']
        },
        type: {
            type: String,
            enum: ['STANDARD', 'CUSTOM'],
            default: 'CUSTOM'
        },
        permissionCode: {
            type: String,
            default: "APP_NAVIGATION_CATEGORY"
        },
        navigationItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppNavigationLink",
        }]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);


const AppNavigationCategory = mongoose.model("AppNavigationCategory", schema);
module.exports = AppNavigationCategory;