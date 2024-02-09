const mongoose = require("mongoose");



// FIELDS ARE >>>
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Please enter name']
        },
        baseRoute: String,
        type: {
            type: String,
            enum: ['STANDARD', 'CUSTOM'],
            default: 'CUSTOM'
        },
        permission: {
            type: String,
            default: "APP_NAVIGATION_LINK"
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);


const AppNavigationLink = mongoose.model("AppNavigationLink", schema);
module.exports = AppNavigationLink;