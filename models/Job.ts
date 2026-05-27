import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({

    pickupLocation: {
        type: String,
        required: true
    },

    deliveryLocation: {
        type: String,
        required: true
    },

    jobDate: {
        type: String
    },

    weight: {
        type: Number
    },

    truckType: {
        type: String,
        enum:[
            "HIAB",
            "TRUCK",
            "TRUCK_TRAILER"
        ]
    },

    status: {
        type: String,
        enum: [
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED"
        ],
        default: "PENDING"
    },

    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:null
    },

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    comments:[{
        type:String
    }]

},
{
    timestamps:true
});

export default mongoose.models.Job ||
mongoose.model("Job",JobSchema);