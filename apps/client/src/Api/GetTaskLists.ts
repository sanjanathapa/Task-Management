import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTask: build.query({
      query: () => ({
        url: "/task",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetTaskQuery } = extendedApi;
