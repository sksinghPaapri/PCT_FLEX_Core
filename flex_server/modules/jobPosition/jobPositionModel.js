const mongoose = require('mongoose');

const jobPositionSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        permissionCode: {
            type: String,
            default: "JOB_POSITION",
            select: false
        },
        isActive:{
            type:Boolean,
            default: true
        }

    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

const JobPosition = mongoose.model('JobPosition', jobPositionSchema);
module.exports = JobPosition;