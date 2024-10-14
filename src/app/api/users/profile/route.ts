import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import User from "@/models/userModel"
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token } = reqBody

    const paylaod: any = await jwt.verify(token, process.env.SECRET_TOKEN!)
    const { userId } = paylaod

    const user = await User.findById(userId).select("-password")
    if (!user) {
      return NextResponse.json({ success: false, message: "user found" })
    }
    return NextResponse.json({ user, message: "user found" })
  } catch (error) {
    console.log(error)
  }
}
