import { NextResponse } from "next/server";
import { initiatePayment } from "@/server/serverActions";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { amount, username, paymentForm } = reqBody;
    const response = await initiatePayment(amount, username, paymentForm);
    return NextResponse.json({
      message: response.message,
      status: response.status,
      order: response.order,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    } else {
      return NextResponse.json({
        message: "An unknown error occurred",
        status: 500,
      });
    }
  }
}
