import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUsersQuery } = extendedApi;