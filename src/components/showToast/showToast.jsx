import { toast, Bounce } from "react-toastify";

const showToast = (message, type) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };
  if (type === "success") {
    toast.success(message, toastOptions);
  } else {
    toast.error(message, toastOptions);
  }
};

export default showToast;