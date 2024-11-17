"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DropDownMenu from "./dropdownMenu";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between h-16 p-4 text-sm text-center md:p-8 md:text-lg">
      <div className="font-bold logo">
        <Link
          href="/"
          className="flex items-center justify-center gap-4 cursor-pointer"
        >
          <Image
            className="h-12"
            src="/Cookie.png"
            alt="Logo"
            width={48}
            height={48}
          />
          <h1 className="hidden text-2xl md:block">Buy Me A Cookie</h1>
        </Link>
      </div>
      {!session ? (
        <ul className="flex items-center justify-between gap-4 font-semibold text-center md:gap-8 text-l">
          <li className="hover:cursor-pointer">Creators</li>
          <li className="hover:cursor-pointer">
            <Link href="/login">Log in</Link>
          </li>
          <li className="hover:cursor-pointer">
            <Link href="/signup">
              <button
                type="button"
                className="px-4 py-2 text-center text-white bg-purple-700 rounded-full hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 hover:scale-105"
              >
                <div className="block md:hidden">Start my page</div>
                <div className="hidden md:block">Sign up</div>
              </button>
            </Link>
          </li>
        </ul>
      ) : (
        <DropDownMenu />
      )}
    </nav>
  );
};

export default Navbar;
