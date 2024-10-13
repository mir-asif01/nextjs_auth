import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    console.log("log from mailter.ts utility file", email, emailType, userId)
    const salt = await bcrypt.genSalt(9)
    const hashedToken = await bcrypt.hash(userId.toString(), salt)

    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 60,
      })
    }
    if (emailType === "RESET") {
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
      from: "asifbsb2002@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Password reset email",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}
