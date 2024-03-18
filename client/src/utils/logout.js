import { toast } from "react-toastify";
import { loginStore } from "../slices/loginSlice";
import { store } from "../store";

export const handleLogout = (msg = "Logged Out Successfully") => {
  store.dispatch(loginStore({ token: "", user: {} }));

  localStorage.clear();
  sessionStorage.clear();
  toast.success(msg);
};
