"use client";
import React, { useEffect } from "react";
import Navbar from "@/src/app/[username]/components/navbar";
import Loader from "@/src/components/Loader";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateUser } from "@/src/server/serverActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [form, setForm] = React.useState({});

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }
    getData();
  }, [router, session]);

  const getData = async () => {
    try {
      let user = await fetchUser(session.user.username);
      setForm(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(session.user.username, form);
      toast.success("Profile Updated Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Username Already Exists", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    setLoading(false);
    setTimeout(reloadPage, 2000);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <div className="container px-16 py-5 mx-auto md:px-0">
          <h1 className="my-5 text-2xl font-bold text-center md:text-3xl">
            Welcome to your Dashboard
          </h1>
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            {[
              "name",
              "email",
              "contact",
              "username",
              "about",
              "razorpay_id",
              "razorpay_secret",
            ].map((field) => (
              <div className="my-2" key={field}>
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace("_", " ")}
                </label>
                <input
                  value={form[field] || ""}
                  onChange={handleChange}
                  type={
                    field.includes("email")
                      ? "email"
                      : field.includes("contact")
                      ? "tel"
                      : field.includes("razorpay_secret")
                      ? "password"
                      : "text"
                  }
                  disabled={field === "email"}
                  name={field}
                  id={field}
                  className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500"
                />
              </div>
            ))}
            <div className="my-6">
              <button
                type="submit"
                className="block w-full p-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default Dashboard;
