import nodemailer from "nodemailer"

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
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
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
