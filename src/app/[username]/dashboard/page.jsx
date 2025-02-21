"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Loader from "@/components/loader/loader";
import { useSession } from "next-auth/react";
import axios from "axios";
import showToast from "@/components/showToast/showToast";
import {usePathname, useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentForm, setCurrentForm] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      router.push(`/${session.user.username}/dashboard`);
    }
    if (session && session.user.username === pathname.split("/")[1]) {
      fetchUserData();
    }
  }, [session, pathname, router]);

  const fetchUserData = async () => {
    try {
      const res = await axios.post("/api/users/fetchUser", {
        username: session.user.username,
      });
      setForm(res.data.user);
      setCurrentForm(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDataUpdate = async () => {
    if (JSON.stringify(form) === JSON.stringify(currentForm)) {
      showToast("No changes detected 😥", "error");
      return;
    }
    try {
      const res = await axios.post("/api/users/updateUserData", {
        username: session.user.username,
        data: form,
      });
      if (res.data.status === 200) {
        showToast(res.data.message, "success");
      } else {
        showToast(res.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      showToast("An error occurred", "error");
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <Navbar />
        <div className="container px-16 py-5 mx-auto md:px-0">
          <h1 className="my-5 text-2xl font-bold text-center md:text-3xl">
            Welcome to your dashboard {session.user.name} 🎉
          </h1>
          <div className="max-w-2xl mx-auto">
            {[
              "name",
              "username",
              "email",
              "password",
              "contact",
              "about",
              "razorPay_id",
              "razorPay_secret",
            ].map((field) => (
              <div className="my-2" key={field}>
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace("_", " ").toUpperCase()}
                </label>
                <input
                  value={field === "password" ? "********" : form[field] || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type={
                    field.includes("email")
                      ? "email"
                      : field.includes("contact")
                      ? "tel"
                      : field.includes("razorPay_secret")
                      ? "password"
                      : field.includes("password")
                      ? "password"
                      : "text"
                  }
                  disabled={field === "email" || field === "password"}
                  name={field}
                  id={field}
                  className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-900"
                />
              </div>
            ))}
            <div className="my-6">
              <button
                className="block w-full p-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:bg-gray-500"
                onClick={() => {
                  handleDataUpdate();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
