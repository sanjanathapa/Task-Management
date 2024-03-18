import { toast } from "react-toastify";

export const handleError = (error) => {
  console.log("errro>>>>>>>>", error);
  const errMsg =
    error?.data?.error ||
    error?.data?.message ||
    error?.err ||
    error?.message ||
    error?.error;

  if (errMsg) {
    toast.error(errMsg);
  }
};
