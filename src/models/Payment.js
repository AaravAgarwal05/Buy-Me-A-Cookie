import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
    index: true,
  },
  message: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Payment || model("Payment", paymentSchema);
