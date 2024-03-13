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
  console.log(loginToken, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", loginToken);

  const localStorageToken = loginToken || localStorage.getItem("token");

  return { localStorageToken, user };
};
