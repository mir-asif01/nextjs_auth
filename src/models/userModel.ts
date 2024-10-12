import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please give a username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please give a email"],
  },
  password: {
    type: String,
    required: [true, "Please give password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: String,
  verifyToken: String,
  verifyTokenExpiry: String,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
