import React from "react";
import PaymentPage from "@/src/components/paymentPage";
import connectDB from "@/src/db/connectDB";
import User from "@/src/models/user";
import { notFound } from "next/navigation";

const Homepage = async ({ params }) => {
  await connectDB();

  const user = await User.findOne({ username: params.username });
  if (!user) {
    notFound();
  }
  return <PaymentPage username={params.username} />;
};

export default Homepage;
