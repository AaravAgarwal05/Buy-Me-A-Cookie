"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/[username]/Components/Navbar";

const Earnings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!session) {
    return null;
  }

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Earnings;
