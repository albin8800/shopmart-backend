import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Succesfully");
    } catch (error) {
        console.log("MongoDB Connection Failed");
        process.exit(1);
    }
};