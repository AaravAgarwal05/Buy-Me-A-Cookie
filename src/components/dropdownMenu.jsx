import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="relative inline-block text-left">
        <button
          id="dropdownHoverButton"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 md:px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          <div className="md:hidden">Welcome</div>
          <div className="hidden md:block">Welcome Back {session.user.name}</div>
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            id="dropdownHover"
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow md:w-44 dark:bg-gray-700"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link href={`/${session.user.username}`}>
                  <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Homepage
                  </div>
                </Link>
              </li>
              <li>
                <Link href={`/${session.user.username}/dashboard`}>
                  <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li>
                <Link href={`/${session.user.username}/earnings`}>
                  <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Earnings
                  </div>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default DropDownMenu;
