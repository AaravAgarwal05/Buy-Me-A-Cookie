"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Navbar from "@/src/components/navbar/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../loader/loader";
import axios from "axios";
import showToast from "../showToast/showToast";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentForm, setPaymentForm] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [coverImage, setCoverImage] = useState({});
  const [profileImage, setProfileImage] = useState({});
  const [isCoverImageChanged, setIsCoverImageChanged] = useState(false);
  const [isProfileImageChanged, setIsProfileImageChanged] = useState(false);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleClick = (amount) => {
    setPaymentForm({ ...paymentForm, amount: amount });
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.post("/api/users/fetchUser", {
        username: username,
      });
      if (res.status === 200) {
        setCurrentUser(res.data.user);
        const resPayments = await axios.post("/api/users/fetchPayments", {
          username: username,
        });
        if (resPayments.status === 200) {
          setPayments(resPayments.data.payments);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get("paymentStatus");
    if (response === "success") {
      showToast("Payment Successful 🥳", "success");
      setTimeout(() => {
        router.push(`/${username}`);
      }, 5000);
    }
  }, [router, username]);

  const getSignedUrl = async (fileName) => {
    const res = await axios.post("/api/users/getSignedURL", {
      fileName: fileName,
    });
    return res.data.url;
  };

  const handleCoverPicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage({ url: url, file: file });
      setIsCoverImageChanged(true);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage({ url: url, file: file });
      setIsProfileImageChanged(true);
    }
  };

  const handleCoverPicUpload = async () => {
    try {
      const sanitizedFileName = coverImage.file.name
        .split(".")[0]
        .replace(/\s+/g, "_");
      const timestamp = Date.now();
      const objectKey = `${sanitizedFileName}_${timestamp}`;
      const url = await getSignedUrl(objectKey);
      const res = await axios.put(url, coverImage.file, {
        headers: {
          "Content-Type": coverImage.file.type,
        },
      });
      if (res.status === 200) {
        setCurrentUser({
          ...currentUser,
          coverPic: `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${objectKey}`,
        });
        await axios.post("/api/users/updateUserData", {
          username: currentUser.username,
          data: {
            coverPic: `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${objectKey}`,
          },
        });
        showToast("Cover Image Uploaded Successfully 🥳", "success");
      }
    } catch (error) {
      console.error("Error uploading cover image:", error);
      showToast("Cover Image Upload Failed 😥", "error");
    }
  };

  const handleProfilePicUpload = async () => {
    try {
      const sanitizedFileName = profileImage.file.name
        .split(".")[0]
        .replace(/\s+/g, "_");
      const timestamp = Date.now();
      const objectKey = `${sanitizedFileName}_${timestamp}`;
      const url = await getSignedUrl(objectKey);
      const res = await axios.put(url, profileImage.file, {
        headers: {
          "Content-Type": profileImage.file.type,
        },
      });
      if (res.status === 200) {
        setCurrentUser({
          ...currentUser,
          profilePic: `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${objectKey}`,
        });
        await axios.post("/api/users/updateUserData", {
          username: currentUser.username,
          data: {
            profilePic: `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${objectKey}`,
          },
        });
        showToast("Profile Image Uploaded Successfully 🥳", "success");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      showToast("Profile Image Upload Failed 😥", "error");
    }
  };

  const pay = async (amount) => {
    const res = await axios.post("/api/users/initiatePayment", {
      amount: amount,
      username: username,
      paymentForm: paymentForm,
    });

    console.log(res.data);

    const orderId = res.data.order.id;

    const options = {
      key: currentUser.razorpay_id,
      amount: amount * 100,
      currency: "INR",
      name: "Buy me a Cookie",
      description: "Donation",
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
    const rzp = new Razorpay(options);
    rzp.open();
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <Navbar />
        <div className="relative w-full">
          <Image
            className="object-cover w-full h-48 md:h-72 lg:h-96"
            src={currentUser.coverPic || coverImage.url || "/Cover Image.jpeg"}
            alt="Cover Image"
            width={1920}
            height={1080}
          />
          {session && !isCoverImageChanged && (
            <div className="absolute inset-0 flex items-center justify-center w-full gap-2 text-3xl font-bold text-white transition-opacity duration-300 bg-black opacity-0 cursor-pointer bg-opacity-60 hover:opacity-100">
              <Image width={40} height={40} src="/Edit.gif" alt="" />
              Upload
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  handleCoverPicChange(e);
                }}
              />
            </div>
          )}
          {session && isCoverImageChanged && (
            <div className="absolute inset-0 flex items-center justify-center w-full gap-5 text-3xl font-bold text-white bg-black bg-opacity-60">
              <button
                className="p-2 px-4 text-white rounded-lg bg-slate-800"
                onClick={() => {
                  setIsCoverImageChanged(false);
                  setCoverImage("");
                }}
              >
                Cancel
              </button>
              <button
                className="p-2 px-4 text-white rounded-lg bg-slate-800"
                onClick={() => {
                  setIsCoverImageChanged(false);
                  handleCoverPicUpload();
                }}
              >
                Save
              </button>
            </div>
          )}

          <div className="absolute -bottom-20 right-[32%] md:right-[40%] lg:right-[42%] xl:right-[46%] border-white border-2 rounded-full">
            <div className="relative group">
              <Image
                className="rounded-full aspect-square"
                height={150}
                width={150}
                src={
                  currentUser.profilePic || profileImage.url || "/Avatar2.gif"
                }
                alt="Profile"
              />
              {session && !isProfileImageChanged && (
                <div className="absolute inset-0 flex items-center justify-center gap-1 text-sm font-bold text-white transition-opacity duration-300 bg-black rounded-full opacity-0 cursor-pointer bg-opacity-60 group-hover:opacity-100">
                  <Image width={20} height={20} src="/Edit.gif" alt="" />
                  Upload
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      handleProfilePicChange(e);
                    }}
                  />
                </div>
              )}

              {session && isProfileImageChanged && (
                <div className="absolute inset-0 flex items-center justify-center gap-5 text-sm font-bold text-white bg-black rounded-full bg-opacity-60">
                  <button
                    className="p-2 px-4 text-white rounded-lg bg-slate-800"
                    onClick={() => {
                      setIsProfileImageChanged(false);
                      setProfileImage("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="p-2 px-4 text-white rounded-lg bg-slate-800"
                    onClick={() => {
                      setIsProfileImageChanged(false);
                      handleProfilePicUpload();
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 my-24">
          <div className="text-2xl font-bold md:text-3xl">@{username}</div>
          <div className="text-lg font-bold text-slate-500 md:text-xl">
            {currentUser.about}
          </div>
          <div className="text-lg font-semibold text-slate-500 md:text-xl">
            {payments.length} Payments . ₹
            {payments.reduce((a, b) => a + b.amount, 0)} raised since release
          </div>
          <div className="flex flex-col w-4/5 gap-4 mt-10 md:flex-row">
            <div className="w-full p-10 text-white rounded-lg md:w-1/2 bg-slate-900">
              <h2 className="text-2xl font-bold md:my-5">Supporters</h2>
              <ul className="text-lg lg:mx-5 ">
                {payments.length === 0 && (
                  <li className="my-2 text-sm font-bold lg:text-lg">
                    No supporters yet 😥
                  </li>
                )}
                {payments.slice(0, 4).map((p, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-start gap-2 my-2 text-sm lg:text-lg"
                  >
                    <Image width={40} height={40} src="/Avatar.gif" alt="" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message &quot;<span className="font-bold">{p.message}</span>  
                      &quot;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full p-10 text-white rounded-lg md:w-1/2 bg-slate-900">
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
                      className="w-full p-2 text-white rounded-lg bg-slate-800"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <input
                      onChange={handleChange}
                      value={paymentForm.amount || ""}
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      className="w-full p-2 text-white rounded-lg bg-slate-800"
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
                    className="w-full p-2 text-white rounded-lg bg-slate-800"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between mt-4 xl:flex-row">
                <div className="items-center justify-center hidden gap-4 xl:flex ">
                  <button
                    className="p-2 px-4 text-white rounded-lg bg-slate-800"
                    onClick={() => handleClick(1000)}
                  >
                    Pay ₹1000
                  </button>
                  <button
                    className="p-2 px-4 text-white rounded-lg bg-slate-800"
                    onClick={() => handleClick(1500)}
                  >
                    Pay ₹1500
                  </button>
                  <button
                    className="p-2 px-4 text-white rounded-lg bg-slate-800"
                    onClick={() => handleClick(2000)}
                  >
                    Pay ₹2000
                  </button>
                </div>
                <button
                  onClick={() => pay(paymentForm.amount)}
                  className="w-full p-2 text-white bg-blue-500 rounded-lg xl:w-1/3 disabled:bg-gray-500 disabled:cursor-not-allowed"
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
