import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/src/models/payment";
import connectDB from "@/src/db/connectDB";
import User from "@/src/models/user";

export const POST = async (req) => {
  await connectDB();

  try {
    let body = await req.formData();
    body = Object.fromEntries(body);

    const payment = await Payment.findOne({
      paymentId: body.razorpay_order_id,
    });
    if (!payment) {
      console.log("Payment not found for ID:", body.razorpay_payment_id);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    let user = await User.findOne({ username: payment.userId });
    const razorpay_secret = user.razorpay_secret;

    const isValid = validatePaymentVerification(
      {
        payment_id: body.razorpay_payment_id,
        order_id: body.razorpay_order_id,
      },
      body.razorpay_signature,
      razorpay_secret
    );

    if (isValid) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { paymentId: body.razorpay_order_id },
        { paymentStatus: true },
        { new: true }
      );
      console.log("Payment verified and updated:", updatedPayment);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.userId}?payment=true`
      );
    } else {
      console.log(
        "Payment verification failed for ID:",
        body.razorpay_payment_id
      );
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during payment processing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
