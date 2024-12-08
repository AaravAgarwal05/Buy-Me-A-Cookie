import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/src/models/payment";
import connectDB from "@/src/db/connectDB";
import User from "@/src/models/user";

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.formData();
    const reqBody = Object.fromEntries(body.entries());

    const payment = await Payment.findOne({
      paymentId: reqBody.razorpay_order_id,
    });

    if (!payment) {
      return NextResponse.json({
        status: 400,
        message: `Payment not found for order id: ${reqBody.razorpay_order_id}`,
      });
    }

    const user = await User.findOne({ username: payment.userId });
    const razorpay_secret = user.razorPay_secret;

    const isValid = validatePaymentVerification(
      {
        payment_id: reqBody.razorpay_payment_id,
        order_id: reqBody.razorpay_order_id,
      },
      reqBody.razorpay_signature,
      razorpay_secret
    );

    if (isValid) {
      await Payment.findOneAndUpdate(
        { paymentId: reqBody.razorpay_order_id },
        { paymentStatus: true }
      );
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${payment.userId}?paymentStatus=success`,
        303
      );
    } else {
      return NextResponse.json({
        status: 400,
        message: `Payment verification failed for order id: ${reqBody.razorpay_order_id} 😥`,
      });
    }
  } catch (error) {
    console.error("Error during payment processing:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};
