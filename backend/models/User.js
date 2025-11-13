import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // User is either user, tech, or admin
    role: {
        type: String,
        enum: ["user", "tech", "admin"],
        default: "user"
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }    
}, { timestamps: true });

export default mongoose.model("User", userSchema);