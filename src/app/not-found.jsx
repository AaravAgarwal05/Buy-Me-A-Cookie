import React from "react";
import Link from "next/link";
import Image from "next/image";

const Custom404 = () => {
  return (
    <>
      <div className="container flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 mx-auto lg:px-24 lg:py-24 md:py-20 md:px-44 lg:flex-row md:gap-28">
        <div className="relative w-full pb-12 xl:pt-24 xl:w-1/2 lg:pb-0">
          <div className="relative">
            <div className="flex flex-col items-center gap-10">
              <h1 className="my-2 text-2xl font-bold text-white">
                Looks like you&apos;ve found the doorway to the great nothing.
              </h1>
              <p className="my-2 text-white">
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <Link href="/">
                <button className="px-8 py-4 my-2 font-semibold text-center text-white bg-indigo-600 border rounded sm:w-full lg:w-auto md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
              <div>
                <Image
                  src="/404.png"
                  alt="404 Error"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/Group.png"
            alt="Group Illustration"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};

export default Custom404;
