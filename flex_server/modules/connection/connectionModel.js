const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema(
    {
        name: String,
        applicationId: String,
        isActive: {
            type: Boolean,
            default: false
        },
        accountId: {
            type: String,
            required: [true, 'Account id is missing!']  // 
        },
        consumerKey: {
            type: String,
            required: [true, "Please enter consumer key!"] // 
        },
        consumerSecret: {
            type: String,
            required: [true, "Please enter consumer secret!"] // 
        },
        tokenKey: {
            type: String,
            required: [true, "Please enter consumer token id!"] // 
        },
        tokenSecret: {
            type: String,
            required: [true, "Please enter consumer token secret!"] // 
        }


    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

const Connection = mongoose.model('Connection', connectionSchema);
module.exports = Connection;