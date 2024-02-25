import toast from "react-hot-toast";

export const notification = (message: string, status: "error" | "success") => {
  if (status === "error") {
    toast.error(message);
  } else if (status === "success") {
    toast.success(message);
  }
};
