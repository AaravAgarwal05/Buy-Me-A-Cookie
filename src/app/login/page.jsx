"use client";
import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/${session.user.username}/dashboard`);
    }
  }, [session , router]);
  if (!session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col">
          <div className="w-screen min-h-[745px] md:min-h-[895px] lg:min-h-[945px] xl:min-h-[750px] flex justify-center items-center p-2 xl:p-0 md:p-20 ">
            <div className="w-[380px]">
              <div className="mb-8 text-3xl font-bold text-center xs:text-2xl xs:mb-6">
                Welcome back
              </div>
              <div>
                <input
                  className="w-full h-12 px-4 py-3 font-medium tracking-normal text-black transition duration-75 ease-out bg-gray-100 border-2 border-transparent outline-2 outline-gray-900 rounded-xl text-md focus:bg-white placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0 hover:bg-gray-200 focus:border-white"
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                  id="user_email"
                />
              </div>

              <button
                type="submit"
                className="relative flex items-center justify-center w-full h-12 px-5 mt-8 text-base font-medium rounded-full cursor-pointer focus:outline-none"
                style={{ backgroundColor: "#0070f3", color: "#fff" }}
              >
                <span className="relative z-10 inline-flex items-center justify-center w-full opacity-100">
                  Continue with email
                </span>
                <span className="absolute block opacity-0">
                  <span className="block w-2 h-2 rounded-full dot-flashing-dark bg-dark"></span>
                </span>
              </button>
              <div className="relative flex items-center justify-center py-8 my-1 text-sm text-dark">
                <span className="block w-full h-px bg-white"></span>
                <span className="absolute px-4 py-2 text-white bg-black">
                  or login with
                </span>
              </div>
              <div className="w-full text-black">
                <button
                  type="submit"
                  className="relative flex items-center justify-center w-full h-12 mb-3 text-sm transition-colors bg-white border rounded-lg cursor-pointer border-greyE5 text-dark focus:outline-none hover:bg-dark/5"
                  id="google-login-page"
                  onClick={() => signIn("google")}
                >
                  <span className="relative z-10 inline-flex items-center justify-center w-full">
                    <div className="w-[210px] flex">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 23 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-4"
                      >
                        <path
                          d="M22.7074 12.2531C22.7074 11.4389 22.6436 10.6203 22.5074 9.81934H11.582V14.4315H17.8385C17.5788 15.9191 16.7446 17.235 15.5232 18.0711V21.0638H19.2557C21.4476 18.9777 22.7074 15.8971 22.7074 12.2531Z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M11.5851 23.9555C14.7091 23.9555 17.3436 22.8949 19.2631 21.0641L15.5305 18.0715C14.492 18.802 13.1514 19.2157 11.5894 19.2157C8.56757 19.2157 6.00542 17.1077 5.08611 14.2734H1.23438V17.3585C3.20068 21.403 7.20563 23.9555 11.5851 23.9555Z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M5.07965 14.2764C4.59446 12.7888 4.59446 11.1781 5.07965 9.69055V6.60547H1.23214C-0.410713 9.98981 -0.410713 13.9771 1.23214 17.3614L5.07965 14.2764Z"
                          fill="#FBBC04"
                        ></path>
                        <path
                          d="M11.5851 4.74065C13.2365 4.71424 14.8325 5.35678 16.0285 6.53624L19.3354 3.11669C17.2415 1.08344 14.4622 -0.0344006 11.5851 0.000807131C7.20564 0.000807131 3.20068 2.55337 1.23438 6.60225L5.08186 9.68733C5.99692 6.84871 8.56333 4.74065 11.5851 4.74065Z"
                          fill="#EA4335"
                        ></path>
                      </svg>
                      Continue with Google
                    </div>
                  </span>
                </button>
                <button
                  type="submit"
                  className="relative flex items-center justify-center w-full h-12 mb-3 text-sm transition-colors bg-white border rounded-lg cursor-pointer border-greyE5 text-dark focus:outline-none hover:bg-dark/5"
                >
                  <span className="relative z-10 inline-flex items-center justify-center w-full">
                    <div className="w-[210px] flex">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-4"
                      >
                        <path
                          d="M24.4775 12C24.4775 5.37258 19.105 0 12.4775 0C5.85012 0 0.477539 5.37258 0.477539 12C0.477539 17.9895 4.86574 22.954 10.6025 23.8542V15.4688H7.55566V12H10.6025V9.35625C10.6025 6.34875 12.3941 4.6875 15.1351 4.6875C16.4476 4.6875 17.8213 4.92188 17.8213 4.92188V7.875H16.3082C14.8175 7.875 14.3525 8.80008 14.3525 9.75V12H17.6807L17.1486 15.4688H14.3525V23.8542C20.0893 22.954 24.4775 17.9895 24.4775 12Z"
                          fill="#1877F2"
                        ></path>
                        <path
                          d="M17.1486 15.4688L17.6807 12H14.3525V9.75C14.3525 8.80102 14.8175 7.875 16.3082 7.875H17.8213V4.92188C17.8213 4.92188 16.4481 4.6875 15.1351 4.6875C12.3941 4.6875 10.6025 6.34875 10.6025 9.35625V12H7.55566V15.4688H10.6025V23.8542C11.845 24.0486 13.1101 24.0486 14.3525 23.8542V15.4688H17.1486Z"
                          fill="white"
                        ></path>
                      </svg>
                      Continue with Facebook
                    </div>
                  </span>
                </button>
                <button
                  type="submit"
                  className="relative flex items-center justify-center w-full h-12 mb-3 text-sm transition-colors bg-white border rounded-lg cursor-pointer border-greyE5 text-dark focus:outline-none hover:bg-dark/5"
                >
                  <span className="relative z-10 inline-flex items-center justify-center w-full">
                    <div className="w-[210px] flex">
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 20 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-4"
                      >
                        <path
                          d="M6.68377 24C3.11185 23.9794 0.157227 16.6879 0.157227 12.9745C0.157227 6.90873 4.70762 5.58077 6.4613 5.58077C7.25162 5.58077 8.09551 5.89112 8.83984 6.16577C9.36034 6.35734 9.89865 6.55511 10.198 6.55511C10.3772 6.55511 10.7995 6.38688 11.1724 6.23927C11.9675 5.92272 12.957 5.5293 14.1091 5.5293C14.1112 5.5293 14.114 5.5293 14.116 5.5293C14.9763 5.5293 17.5849 5.71811 19.1532 8.0733L19.5206 8.62534L18.9919 9.0243C18.2366 9.5942 16.8585 10.6338 16.8585 12.6931C16.8585 15.132 18.4192 16.07 19.169 16.5211C19.5 16.7202 19.8426 16.9255 19.8426 17.3746C19.8426 17.6678 17.5025 23.9636 14.1043 23.9636C13.2728 23.9636 12.685 23.7137 12.1666 23.4933C11.642 23.2701 11.1895 23.0779 10.4417 23.0779C10.0627 23.0779 9.58341 23.2571 9.07599 23.4473C8.38257 23.7061 7.5977 24 6.70712 24H6.68377Z"
                          fill="black"
                        ></path>
                        <path
                          d="M14.4691 0C14.5576 3.19106 12.2754 5.40488 9.996 5.26603C9.62039 2.71945 12.2752 0 14.4691 0Z"
                          fill="black"
                        ></path>
                      </svg>
                      Continue with Apple
                    </div>
                  </span>
                </button>
                <button
                  type="submit"
                  className="relative flex items-center justify-center w-full h-12 text-sm transition-colors bg-white border rounded-lg cursor-pointer border-greyE5 text-dark focus:outline-none hover:bg-dark/5"
                  onClick={() => signIn("github")}
                >
                  <span className="relative z-10 inline-flex items-center justify-center w-full">
                    <div className="w-[210px] flex items-center">
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-4"
                      >
                        <path
                          className="fill-black"
                          d="M10.6903 1.1106H12.6581L8.35892 6.0243L13.4166 12.7107H9.45647L6.35477 8.65545L2.80572 12.7107H0.836671L5.43509 7.45498L0.583252 1.1106H4.6439L7.44757 4.81729L10.6903 1.1106ZM9.9996 11.5329H11.09L4.0514 2.22659H2.88127L9.9996 11.5329Z"
                          fill="#1F2022"
                        ></path>
                      </svg>
                      Continue with Twitter
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
