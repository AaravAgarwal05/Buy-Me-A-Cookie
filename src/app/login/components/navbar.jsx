"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-center p-8 h-16 sticky top-0 z-10">
      <div className="logo font-bold">
        <Link
          href="/"
          className="flex justify-center items-center gap-4 cursor-pointer"
        >
          <Image
            className="h-12"
            src="/Cookie.png"
            alt="Logo"
            width={48}
            height={48}
          />
        </Link>
      </div>
      <div className="flex gap-2 text-l">
        <span>Don&apos;t have an account?</span>
        <Link href={"/signup"}>
          <span className="underline">Sign up</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
