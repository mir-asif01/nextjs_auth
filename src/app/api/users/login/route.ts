import { connectDb } from "@/db/connectDb"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDb()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    console.log(reqBody)
    const user = await User.findOne({ email: email })
    if (!user) {
      return NextResponse.json({ message: "user not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Password incorrecy" })
    }

    const jwtPayload = {
      userId: user._id,
    }

    // jwt tokenization
    const token = jwt.sign(jwtPayload, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    })

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    })

    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
