const mongoose = require('mongoose');

const roleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Please enter name."]
        },
        description: String,
        appPermissions: [
            {
                id: {

                },
                name: String,
                code:String
            }
        ],
        permissions: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Permission'
                },
                name: String,
                code: String,
                level: Number
            }
        ],
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

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;