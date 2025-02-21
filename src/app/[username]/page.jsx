import React from "react";
import PaymentPage from "@/components/paymentPage/paymentPage";
import { notFound } from "next/navigation";
import axios from "axios";

const Homepage = async ({ params }) => {
  const { username } = await params;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/users/fetchUser`,
      { username }
    );
    if (res.data.status !== 200) {
      notFound();
    }
    return <PaymentPage username={username} />;
  } catch (error) {
    console.error("Error fetching user:", error);
    notFound();
  }
};

export default Homepage;
