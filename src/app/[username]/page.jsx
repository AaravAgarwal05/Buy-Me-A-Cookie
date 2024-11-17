import React from "react";
import PaymentPage from "@/src/components/paymentPage";
import connectDB from "@/src/db/connectDB";
import User from "@/src/models/user";
import { notFound } from "next/navigation";

const Homepage = async ({ params }) => {
  await connectDB();
  const { username } = await params;
  const user = await User.findOne({ username: username });
  console.log("user found ");
  if (!user) {
    notFound();
  }
  return <PaymentPage username={username} />;
};

export default Homepage;
