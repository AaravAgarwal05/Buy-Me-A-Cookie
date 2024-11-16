"use server";

import Razorpay from "razorpay";
import Payment from "@/src/models/payment";
import connectDB from "@/src/db/connectDB";
import User from "@/src/models/user";

export const initiate = async (amount, userId, paymentForm) => {
  try {
    await connectDB();

    let user = await User.findOne({ username: userId });
    const razorpay_id = user.razorpay_id;
    const razorpay_secret = user.razorpay_secret;

    const instance = new Razorpay({
      key_id: razorpay_id,
      key_secret: razorpay_secret,
    });

    let options = {
      amount: parseInt(amount, 10) * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      notes: {
        key1: "value1",
        key2: "value2",
      },
    };

    const order = await instance.orders.create(options);

    await Payment.create({
      paymentId: order.id,
      userId: userId,
      amount: amount,
      message: paymentForm.message,
      name: paymentForm.name,
    });

    return order;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Payment initiation failed" + error);
  }
};

export const fetchUser = async (userId) => {
  await connectDB();
  let user = await User.findOne({ username: userId });
  user = user.toObject({ flattenObjectsIds: true });
  return user;
};

export const fetchPayments = async (userId) => {
  await connectDB();
  const payments = await Payment.find({
    userId: userId,
    paymentStatus: "true",
  })
    .sort({ amount: -1 })
    .lean();
  return payments;
};

export const updateUser = async (userId, data) => {
  await connectDB();

  if (typeof data !== "object" || data === null) {
    return { error: "Invalid data format" };
  }

  let newData = {
    name: data.name,
    email: data.email,
    about: data.about,
    username: data.username,
    contact: data.contact,
    razorpay_id: data.razorpay_id,
    razorpay_secret: data.razorpay_secret,
  };

  try {
    if (userId !== newData.username) {
      let existingUser = await User.findOne({ username: newData.username });
      if (existingUser) {
        throw new Error("Username already exists");
      }
    }

    await User.updateOne({ username: userId }, { $set: newData });
    await Payment.updateMany({ userId: userId }, { userId: newData.username });
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadCoverPic = async (userId, data) => {
  await connectDB();

  if (typeof data !== "string" || !data.startsWith("data:image/")) {
    return { error: "Invalid data format" };
  }

  try {
    let result = await User.updateOne(
      { _id: userId },
      { $set: { coverPic: data } }
    );

    if (result.modifiedCount === 0) {
      return { error: "Cover picture upload failed" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Cover picture upload failed due to an error" };
  }
};

export const uploadProfilePic = async (userId, data) => {
  await connectDB();

  if (typeof data !== "string" || !data.startsWith("data:image/")) {
    return { error: "Invalid data format" };
  }

  try {
    let result = await User.updateOne(
      { _id: userId },
      { $set: { profilePic: data } }
    );

    if (result.modifiedCount === 0) {
      return { error: "Profile picture upload failed" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Profile picture upload failed due to an error" };
  }
};
