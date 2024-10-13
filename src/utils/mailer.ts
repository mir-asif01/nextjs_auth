import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
export const sendMail = async ({
  email,
  emailType,
  userId,
}: {
  email: string
  emailType: string
  userId: string
}) => {
  try {
    if (emailType === "VERIFY") {
      const hashedToken = await bcrypt.hash(userId, 9)

      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 60,
      })
    }
    if (emailType === "RESET") {
      const hashedToken = await bcrypt.hash(userId, 9)

      const user = await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 60,
      })
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    })

    const mailOptions = {
      from: "asif@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Password reset email",
      html: "<b>Hello world?</b>",
    }

    const mailResponse = await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}
