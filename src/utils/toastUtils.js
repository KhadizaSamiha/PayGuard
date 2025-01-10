import { toast } from "react-toastify";

export const showToast = (message, type = "success") => {
  if (type === "success") toast.success(message);
  if (type === "error") toast.error(message);
};
