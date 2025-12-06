import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    phone: { type: String },
    email: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
})

export default mongoose.model("User", userSchema);