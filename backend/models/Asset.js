import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    name: String,
    category: String,
    serialNumber: String,
    assignedUser: String,
    purchaseDate: Date,
    warranty: String,
    status: { type: String, default: "active" }
}, { timestamp: true });

export default mongoose.model("Asset", assetSchema);