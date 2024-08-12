"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/[username]/Components/Navbar";

const earnings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }
  }, [router, session]);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default earnings;
