"use server";
import Razorpay from "razorpay";
import Payment from "../models/payment";
import connectDB from "../db/connectDB";
import User from "../models/user";
import s3Bucket from "../aws/s3Bucket";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const initiatePayment = async (amount, username, paymentForm) => {
  try {
    await connectDB();

    const user = await User.findOne({ username: username });
    const razorPay_id = user.razorPay_id;
    const razorPay_secret = user.razorPay_secret;

    const instance = new Razorpay({
      key_id: razorPay_id,
      key_secret: razorPay_secret,
    });

    const options = {
      amount: parseInt(amount, 10) * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      notes: {
        description: paymentForm.message,
      },
    };

    const order = await instance.orders.create(options);

    const payment = new Payment({
      paymentId: order.id,
      userId: username,
      amount: amount,
      message: paymentForm.message,
      name: paymentForm.name,
    });
    await payment.save();
    return {
      status: 200,
      message: "Payment initiated successfully 🥳",
      order: order,
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error("Failed to initiate payment:", err.message);
    } else {
      console.error("Failed to initiate payment: An unknown error occurred");
    }
    throw err;
  }
};

export const fetchUser = async (username) => {
  try {
    await connectDB();
    const user = await User.findOne({ username: username });
    if (!user) {
      return {
        status: 400,
        message: "User not found 😥",
      };
    }
    return {
      status: 200,
      message: "User found Successfully 🥳",
      user: user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      status: 500,
      message: "User fetching failed 😥",
    };
  }
};

export const fetchPayments = async (username) => {
  try {
    await connectDB();
    const payments = await Payment.find({ userId: username });
    if (!payments) {
      return {
        status: 400,
        message: "Payments not found 😥",
      };
    }
    return {
      status: 200,
      message: "Payments fetched successfully 🥳",
      payments: payments,
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return {
      status: 500,
      message: "Payments fetching failed 😥",
    };
  }
};

export const updateUserData = async (username, data) => {
  try {
    await connectDB();
    if (data.username !== username) {
      const existingUser = await User.findOne({ username: data.username });
      if (existingUser) {
        return {
          status: 400,
          message: "Username already exists 😥",
        };
      }
    }
    await User.findOneAndUpdate({ username: username }, { $set: data });
    await Payment.updateMany(
      { userId: username },
      { $set: { userId: data.username } }
    );
    return {
      status: 200,
      message: "User updated successfully 🥳",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      status: 500,
      message: "User update failed 😥",
    };
  }
};

export const createSignedURL = async (fileName) => {
  if (!fileName || typeof fileName !== "string") {
    return {
      status: 400,
      message: "Invalid file name 😥",
    };
  }
  try {
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });
    const signedURL = await getSignedUrl(s3Bucket, putObjectCommand, {
      expiresIn: 60,
    });
    return {
      status: 200,
      message: "URL generated successfully 🥳",
      url: signedURL,
    };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return {
      status: 500,
      message: "URL generation failed 😥",
    };
  }
};

