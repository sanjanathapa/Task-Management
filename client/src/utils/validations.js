import { shallowEqual, useSelector } from "react-redux";
import { get } from "./lodash";

export const TaskManagementCurrentUser = () => {
  const { loginToken, user } = useSelector(
    (state) => ({
      loginToken: get(state, "LoginSlice.loginToken", null),
      user: get(state, "LoginSlice.user", null),
    }),
    shallowEqual
  );

  const localStorageToken = loginToken || localStorage.getItem("token");
  const localStorageUser = user || JSON.parse(localStorage.getItem("user"));

  return { localStorageToken, user: localStorageUser };
};
