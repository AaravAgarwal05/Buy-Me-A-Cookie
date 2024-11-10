import React from "react";
import PaymentPage from "@/components/PaymentPage";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
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
