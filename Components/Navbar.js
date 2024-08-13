"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DropDown from "./DropDown";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center text-center p-4 md:p-8 h-16 sticky top-0 z-10 text-sm md:text-lg">
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
          <h1 className="text-2xl hidden md:block">Buy Me A Cookie</h1>
        </Link>
      </div>
      {!session ? (
        <ul className="flex justify-between text-center items-center gap-4 md:gap-8 text-l font-semibold">
          <li className="hover:cursor-pointer">Creators</li>
          <li className="hover:cursor-pointer">
            <Link href="/login">Log in</Link>
          </li>
          <li className="hover:cursor-pointer">
            <Link href="/signup">
              <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full px-4 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 hover:scale-105"
              >
                <div className="block md:hidden">Start my page</div>
                <div className="hidden md:block">Sign up</div>
              </button>
            </Link>
          </li>
        </ul>
      ) : (
        <DropDown />
      )}
    </nav>
  );
};

export default Navbar;
