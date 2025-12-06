import User from "../models/User";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/sendOtp";
import { use } from "react";


export const sendOtp = async (req, res) => {
    try {
        const { input } = req.body;

        if(!input) return res.status(400).json({ message: "Phone or Email Required" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        let user = await User.findOne({ $or: [{ phone: input }, { email: input }]})

         if(!user) {
            user = await User.create({
                phone: !input.includes("@") ? input: null;
                email: input.includes("@") ? input: null;
            })
         }

         user.otp = otp;
         user.otpExpires = Date.now() + 5 * 60 * 1000;
         await user.save();

         if(input.includes("@")) {
            await sendOtpEmail(input, otp);
         } else {
            console.log("SMS OTP:", otp);
         }
         res.json({ success: true, message: "OTP Send"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { input, otp } = req.body;

        const user = await User.findOne({
            $or: [{ phone: input }, { email: input }],
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if(!user) return res.status(400).json({ message: "Invalid or Expired OTP" });

        user.isVerified = true;
        user.otp = null;
        user.save();

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn : "7d" });

        res.json({ success: true, token });

        

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}