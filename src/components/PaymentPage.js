"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import Navbar from "@/app/[username]/Components/Navbar";
import {
  fetchPayments,
  fetchUser,
  initiate,
  uploadCoverPic,
  uploadProfilePic,
} from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [paymentForm, setPaymentForm] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [payments, setPayments] = React.useState([]);
  const [coverImage, setCoverImage] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const SearchParams = useSearchParams();

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleClick = (amount) => {
    setPaymentForm({ ...paymentForm, amount: amount });
  };

  const getData = async () => {
    try {
      let u = await fetchUser(username);
      setCurrentUser(u);
      let p = await fetchPayments(username);
      setPayments(p);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (SearchParams.get("payment") === "true") {
      toast.success("Payment Successful", {
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

    setTimeout(router.push(`/${username}`), 2000);
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleCoverPicUpload = async (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setCoverImage(reader.result);
      uploadCoverPic(currentUser._id, reader.result);
      toast.success("Cover Image uploaded Successfully", {
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
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      toast.error("Error uploading Cover Image", {
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
    };
    setTimeout(reloadPage, 2000);
  };

  const handleProfilePicUpload = async (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setProfileImage(reader.result);
      uploadProfilePic(currentUser._id, reader.result);
      toast.success("Profile Image uploaded Successfully", {
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
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      toast.error("Error uploading Profile Image", {
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
    };
    setTimeout(reloadPage, 2000);
  };

  const pay = async (amount) => {
    const response = await initiate(amount, username, paymentForm);
    const orderId = response.id;

    const options = {
      key: currentUser.razorpay_id,
      amount: amount * 100,
      currency: "INR",
      name: "Buy me a Cookie",
      description: "Test Transaction",
      image: "./Cookie.png",
      order_id: orderId,
      callback_url: "/api/razorpay",
      prefill: {
        name: "Aarav Agarwal",
        email: "aarav.knp.08@gmail.com",
        contact: "9219001562",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
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
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <Navbar />
        <div className="w-full relative">
          <Image
            className="object-cover w-full h-48 md:h-72 lg:h-96"
            src={currentUser.coverPic || coverImage || "/Cover Image.jpeg"}
            alt="Cover Image"
            width={1920}
            height={1080}
          />
          {session && (
            <div className="absolute w-full text-3xl inset-0 flex gap-2 items-center justify-center text-white font-bold bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Image width={40} height={40} src="/Edit.gif" alt="" />
              Upload
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleCoverPicUpload}
              />
            </div>
          )}

          <div className="absolute -bottom-20 right-[32%] md:right-[40%] lg:right-[42%] xl:right-[46%] border-white border-2 rounded-full">
            <div className="relative group">
              <Image
                className="rounded-full aspect-square"
                height={150}
                width={150}
                src={currentUser.profilePic || profileImage || "/Avatar2.gif"}
                alt="Profile"
              />
              {session && (
                <div className="absolute inset-0 flex gap-1 items-center justify-center text-white text-sm font-bold rounded-full bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Image width={20} height={20} src="/Edit.gif" alt="" />
                  Upload
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleProfilePicUpload}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-24 flex-col gap-2">
          <div className="font-bold text-2xl md:text-3xl">@{username}</div>
          <div className="text-slate-500 text-lg md:text-xl font-bold">
            {currentUser.about}
          </div>
          <div className="text-slate-500 text-lg md:text-xl font-semibold">
            {payments.length} Payments . ₹
            {payments.reduce((a, b) => a + b.amount, 0)} raised since release
          </div>
          <div className="flex flex-col gap-4 w-4/5 mt-10 md:flex-row">
            <div className="w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
              <h2 className="text-2xl font-bold md:my-5">Supporters</h2>
              <ul className="lg:mx-5 text-lg ">
                {payments.length === 0 && (
                  <li className="my-2 font-bold text-sm lg:text-lg">
                    No supporters yet 😥
                  </li>
                )}
                {payments.slice(0, 4).map((p, i) => (
                  <li
                    key={i}
                    className="my-2 flex gap-2 justify-start items-center text-sm lg:text-lg"
                  >
                    <Image width={40} height={40} src="/Avatar.gif" alt="" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message &quot;{p.message}&quot;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
              <h2 className="text-2xl font-bold md:my-5">Payment</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <input
                      onChange={handleChange}
                      value={paymentForm.name || ""}
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full p-2 rounded-lg text-white bg-slate-800"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <input
                      onChange={handleChange}
                      value={paymentForm.amount || ""}
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      className="w-full p-2 rounded-lg text-white bg-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <input
                    onChange={handleChange}
                    value={paymentForm.message || ""}
                    type="text"
                    name="message"
                    placeholder="Message"
                    className="w-full p-2 rounded-lg text-white bg-slate-800"
                  />
                </div>
              </div>
              <div className="flex flex-col xl:flex-row justify-between mt-4">
                <div className="justify-center items-center gap-4 hidden xl:flex ">
                  <button
                    className="bg-slate-800 text-white p-2 rounded-lg px-4"
                    onClick={() => handleClick(1000)}
                  >
                    Pay ₹1000
                  </button>
                  <button
                    className="bg-slate-800 text-white p-2 rounded-lg px-4"
                    onClick={() => handleClick(1500)}
                  >
                    Pay ₹1500
                  </button>
                  <button
                    className="bg-slate-800 text-white p-2 rounded-lg px-4"
                    onClick={() => handleClick(2000)}
                  >
                    Pay ₹2000
                  </button>
                </div>
                <button
                  onClick={() => pay(paymentForm.amount)}
                  className="bg-blue-500 text-white p-2 rounded-lg w-full xl:w-1/3 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  disabled={
                    !paymentForm.amount ||
                    !paymentForm.name ||
                    !paymentForm.message
                  }
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PaymentPage;
