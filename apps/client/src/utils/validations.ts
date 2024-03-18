import { shallowEqual, useSelector } from "react-redux";
import { get } from "./lodash";

export const TaskManagementCurrentUser = () => {
  const { loginToken, user } = useSelector(
    (state: RootState) => ({
      loginToken: get<string | null>(state, "LoginSlice.loginToken", null),
      user: get<Record<string, any> | null>(state, "LoginSlice.user", null),
    }),
    shallowEqual,
  );
  const localStorageToken = loginToken || localStorage.getItem("token");

  const localStorageUser =
    !!user && Object.keys(user).length !== 0
      ? user
      : JSON.parse(localStorage.getItem("user") || "{}");

  return { localStorageToken, user: localStorageUser };
};

interface RootState {
  LoginSlice: {
    loginToken: string | null;
    user: Record<string, any> | null; // Adjust the type according to your user structure
  };
}
