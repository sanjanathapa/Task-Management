import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../Api/index";
import LoginSlice from "../slices/loginSlice";

const rootReducers = combineReducers({
  LoginSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducers;
