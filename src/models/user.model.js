import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"], // Corrected 'require' to 'required'
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"], // Corrected message
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"], // Corrected message
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Check if the model already exists to prevent overwriting
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
