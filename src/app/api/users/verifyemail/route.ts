import { connectDb } from "@/db/connectDb"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connectDb()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token } = reqBody
    console.log(`verify token : ${token}`)

    if (!token) {
      return NextResponse.json({ message: "verify token not found" })
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    })
    if (!user) {
      return NextResponse.json({ message: "invalid token" })
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()
    return NextResponse.json({ message: "verification successful" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
