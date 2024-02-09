const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name.'],
            unique: true
        },
        address: String,
        permissionCode: {
            type: String,
            default: "LOCATION",
            select: false
        },
        isActive: {
            type: Boolean,
            default: true
        }

    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
}
)

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;