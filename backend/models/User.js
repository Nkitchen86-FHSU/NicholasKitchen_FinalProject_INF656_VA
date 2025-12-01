import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

export default mongoose.model("User", userSchema);