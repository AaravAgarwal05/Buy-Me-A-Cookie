"use client";
import React from "react";
import DropDown from "@/components/DropDown";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-center p-8 h-16 sticky top-0 z-10">
      <div className="logo font-bold">
        <Link
          href="/"
          className="flex justify-center items-center gap-8 cursor-pointer"
        >
          <div className="flex justify-center items-center gap-2 md:gap-8 cursor-pointer">
            <Image
              className="h-8"
              src="/Heart Cookie.gif"
              alt="Logo"
              width={32}
              height={32}
            />
            <h1 className="md:text-3xl italic font-bold">BUY ME A COOKIE</h1>
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
