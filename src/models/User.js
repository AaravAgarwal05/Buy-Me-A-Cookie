import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contact: {
    type: String,
    default: "",
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  about: {
    type: String,
    default: "Welcome to Buy Me a Cookie",
  },
  razorpay_id: {
    type: String,
    default: "",
  },
  razorpay_secret: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: '',
  },
  coverPic: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.User || model("User", userSchema);
