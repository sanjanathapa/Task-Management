import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: {
    loginToken: "",
    user: {},
  },
  reducers: {
    loginStore: (state, action) => {
      console.log("sanjana>>>>>>>>>>>>>>>>", action);
      state.loginToken = action.payload.token;
      state.user = action.payload.user;
    },
  },
});
export const { loginStore } = loginSlice.actions;

export default loginSlice.reducer;
