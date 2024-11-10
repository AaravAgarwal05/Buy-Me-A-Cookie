import React from "react";
import Link from "next/link";
import Image from "next/image";

const Custom404 = () => {
  return (
    <>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 container mx-auto">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="flex flex-col items-center">
              <h1 className="my-2 text-white font-bold text-2xl">
                Looks like you&apos;ve found the doorway to the great nothing
              </h1>
              <p className="my-2 text-white">
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <Link href="/">
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
              <div>
                <Image
                  src="https://i.ibb.co/G9DC8S0/404-2.png"
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
            src="https://i.ibb.co/ck1SGFJ/Group.png"
            alt="Group Illustration"
            width={300}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default Custom404;
