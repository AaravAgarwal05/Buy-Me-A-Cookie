import mongoose, { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Payment || model("Payment", paymentSchema);
