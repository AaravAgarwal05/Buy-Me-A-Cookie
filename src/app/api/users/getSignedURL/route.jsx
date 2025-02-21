import { NextResponse } from "next/server";
import { createSignedURL } from "@/server/serverActions";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { fileName } = reqBody;
    const response = await createSignedURL(fileName);
    return NextResponse.json({
      message: response.message,
      status: response.status,
      url: response.url,
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
