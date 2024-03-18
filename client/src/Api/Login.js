import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation } = extendedApi;
