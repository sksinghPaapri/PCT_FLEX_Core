const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Please enter name."]
        },
        description: String,
        code: String,
        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;