import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = "http://localhost:5000/api/v1";
export const api = createApi({
  reducerPath: "apiReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      // console.log("state>>>", state)
      const token = localStorage.getItem("token") || state;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        // headers.set("Bearer Token", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
