const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Please enter name."]
        },
        description: String,
        permissionCode: {
            type: String,
            default: "DEPARTMENT",
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

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;