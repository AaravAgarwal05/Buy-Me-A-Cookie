import React from "react";
import Navbar from "@/src/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative w-full px-8 mx-auto lg:px-32 xs:px-0 pt-11 md:pt-28">
        <div className="container flex flex-wrap mx-auto mb-24 lg:w-11/12">
          <div className="flex flex-col items-center w-full mx-auto text-lg text-center xl:w-1/2">
            <div className="flex items-center justify-center gap-1 mb-4 md:mb-12">
              <Image height={24} width={24} src="/Star.svg" alt="" />
              <Image height={24} width={24} src="/Star.svg" alt="" />
              <Image height={24} width={24} src="/Star.svg" alt="" />
              <Image height={24} width={24} src="/Star.svg" alt="" />
              <Image height={24} width={24} src="/Star.svg" alt="" />
              <div className="text-sm md:text-lg md:ml-1">
                Loved by 10,00,000+ creators
              </div>
            </div>
            <div className="relative flex flex-col items-center justify-center w-full overflow-visible text-5xl font-semibold leading-none md:text-8xl">
              Fund your creative work
            </div>
            <div className="w-full mt-2 mb-4 text-lg text-center md:text-2xl tagline font-cr-regular leading-34 md:w-5/6 md:mx-auto xs:w-full xxs:text-18">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </div>
            <Link href="/signup">
              <button
                type="button"
                className="flex items-center justify-center mt-2 md:mt-8 text-lg md:text-2xl font-semibold text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full px-10 md:px-12 py-2.5 md:py-5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 hover:scale-105"
              >
                Start my page
              </button>
            </Link>
            <div className="mx-auto mt-4 text-lg desc font-cr-regular leading-30 w-600 xs:w-full xs:text-center xs:mt-8 xs:leading-30 xs:text-16">
              It’s free and takes less than a minute!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
