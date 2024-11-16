"use client";
import React from "react";
import DropDown from "@/src/components/dropdown";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between h-16 p-8 text-center">
      <div className="font-bold logo">
        <Link
          href="/"
          className="flex items-center justify-center gap-8 cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2 cursor-pointer md:gap-8">
            <Image
              className="h-8"
              src="/Heart Cookie.gif"
              alt="Logo"
              width={32}
              height={32}
            />
            <h1 className="italic font-bold md:text-3xl">BUY ME A COOKIE</h1>
          </div>
        </Link>
      </div>
      <div>
        <DropDown />
      </div>
    </nav>
  );
};

export default Navbar;
