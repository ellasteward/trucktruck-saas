import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    subscriptionPlan: {
        type: String,
        default: "Starter"
    }

});

export default mongoose.models.Company ||
mongoose.model("Company", CompanySchema);