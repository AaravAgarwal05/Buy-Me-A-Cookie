import { NextResponse } from "next/server";
import { fetchPayments } from "@/src/server/serverActions";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username } = reqBody;
    const response = await fetchPayments(username);
    return NextResponse.json({
      status: response.status,
      message: response.message,
      payments: response.payments,
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
