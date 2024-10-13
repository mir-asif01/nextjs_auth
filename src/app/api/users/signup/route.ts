import { connectDb } from "@/db/connectDb"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendMail } from "@/utils/mailer"

connectDb()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    console.log({ username, email, password })

    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ message: "User already exists. try login" })
    }

    const salt = await bcrypt.genSalt(9)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()
    console.log(savedUser)

    // send email
    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id })

    return NextResponse.json({
      message: "User signup successful",
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message })
  }
}
