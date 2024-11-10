"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const signup = () => {
  return (
    <>
      <div className="h-screen w-screen bg-purple-700 absolute z-10 flex">
        <div className="hidden lg:block h-full w-1/3 col-span-2">
          <div className="flex justify-between flex-col relative h-full">
            <div className="pl-12 pt-12">
              <Link href="/" title="Buy Me a Coffee">
                <Image height={38} width={38} src="/Cookie.png" alt="" />
              </Link>
              <h3 className="mt-7">Welcome to Buy Me a Cookie</h3>
            </div>
            <div className="flex pl-12 pb-12 ">
              <div className="flex">
                <a
                  target="_blank"
                  className="-ml-4 first:ml-0 block border-4 border-purple-700 w-12 h-12 rounded-full relative group overflow-hidden transform hover:scale-110 duration-300"
                >
                  <div className="bg-dark/50 w-full h-full absolute left-0 top-0 opacity-0 transition group-hover:opacity-100"></div>
                  <Image
                    src="/Avatar 1.avif"
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                    height={40}
                    width={40}
                  />
                </a>
                <a
                  target="_blank"
                  className="-ml-4 first:ml-0 block border-4 border-purple-700 w-12 h-12 rounded-full relative group overflow-hidden transform hover:scale-110 duration-300"
                >
                  <div className="bg-dark/50 w-full h-full absolute left-0 top-0 opacity-0 transition group-hover:opacity-100"></div>
                  <Image
                    src="/Avatar 1.avif"
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                    height={40}
                    width={40}
                  />
                </a>
                <a
                  target="_blank"
                  className="-ml-4 first:ml-0 block border-4 border-purple-700 w-12 h-12 rounded-full relative group overflow-hidden transform hover:scale-110 duration-300"
                >
                  <div className="bg-dark/50 w-full h-full absolute left-0 top-0 opacity-0 transition group-hover:opacity-100"></div>
                  <Image
                    src="/Avatar 1.avif"
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                    height={40}
                    width={40}
                  />
                </a>
                <a
                  target="_blank"
                  className="-ml-4 first:ml-0 block border-4 border-purple-700 w-12 h-12 rounded-full relative group overflow-hidden transform hover:scale-110 duration-300"
                >
                  <div className="bg-dark/50 w-full h-full absolute left-0 top-0 opacity-0 transition group-hover:opacity-100"></div>
                  <Image
                    src="/Avatar 1.avif"
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                    height={40}
                    width={40}
                  />
                </a>
              </div>
              <div className="ml-4 font-cr-book text-md flex items-center">
                <div>
                  <div className="flex gap-1">
                    <Image height={13} width={14} src="/Star.svg" alt="" />
                    <Image height={13} width={14} src="/Star.svg" alt="" />
                    <Image height={13} width={14} src="/Star.svg" alt="" />
                    <Image height={13} width={14} src="/Star.svg" alt="" />
                    <Image height={13} width={14} src="/Star.svg" alt="" />
                  </div>
                  <div className="mt-2">Loved by 1,000,000+ creators</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full lg:w-2/3 bg-white lg:rounded-l-3xl text-black flex flex-col">
          <div className="w-full flex items-center justify-between lg:justify-end px-4 pt-6 md:pr-12 md:pt-11">
            <div>
              <Link href="/" title="Buy Me a Coffee">
                <Image height={38} width={38} src="/Cookie.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
              <div className="hidden md:block">Already have an account?</div>
              <Link
                className="ml-1.5 underline hover:no-underline"
                href="login"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center md:flex-1 mt-12 md:mt-0">
            <div className="w-11/12 md:w-2/3 xl:w-2/5 relative">
              <h1 className="text-2xl md:text-3xl font-semibold">
                Create your account
              </h1>
              <h4 className="text-gray-700 mt-0.5">
                Choose a username for your page.
              </h4>
              <div className="mt-4 relative overflow-hidden">
                <h3 className="pl-4 flex items-center rounded-l-lg absolute h-10 top-1 left-1 font-semibold">
                  buymeacookie.com/
                </h3>
                <input
                  className="w-full border-2 border-transparent transition hover:ease-out duration-75 outline-2 outline-dark15 h-12 rounded-xl text-md px-4 py-3 font-medium focus:bg-white placeholder:text-gray-700 tracking-normal focus:outline-none focus:ring-0 focus:ring-offset-0 bg-gray-100 pl-[177px] pr-10"
                  type="text"
                  id="username"
                  placeholder="yourname"
                />
                <div className="absolute right-4 top-4"></div>
              </div>
            </div>
          </div>
          <div className="md:w-full py-4 mx-5 md:mx-0 md:px-16 border-t border-solid mt-3 md:mt-0 flex flex-col-reverse md:flex-row items-center justify-between">
            <h5 className="md:mr-5 mt-6 md:mt-0">
              By continuing, you agree to the{" "}
              <a className="text-dark underline hover:no-underline">
                terms of service
              </a>{" "}
              and{" "}
              <a className="text-dark underline hover:no-underline">
                privacy policy
              </a>
              .
            </h5>
            <button
              type="submit"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold rounded-full text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 h-12 md:h-14 px-3 text-base w-full md:w-40"
            >
              <span className="relative z-10 inline-flex w-full items-center justify-center opacity-100">
                <h5>Sign up</h5>
              </span>
              <span className="block absolute opacity-0">
                <span className="w-2 h-2 rounded-full block bg-dark"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
