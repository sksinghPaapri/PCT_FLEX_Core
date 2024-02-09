const mongoose = require('mongoose');

const customListSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Please enter name."]
        },
        description: String,
        isAlphabeticalOrder: {
            type: String,
            default: false
        },
        isOrderEntered: {
            type: String,
            default: true
        },
        isInactive: {
            type: Boolean,
            default: false
        },
        options: [{
            name: String
        }]

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

const CustomList = mongoose.model('CustomList', customListSchema);
module.exports = CustomList;