import niodemailer from "nodemailer";

export const sendOtpEmail = async (sendOtpEmail, otp) => {
    const transporter = niodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    return transporter.sendMail({
        from: "ShopMart <no-reply@shopmart.com>",
        to: email,
        subject: "Your OTP Code",
        text: `Your Verification OTP is: ${otp}`
    });
}