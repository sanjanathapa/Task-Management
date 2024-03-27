import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTask: build.query({
      query: (searchQuery = "") => {
        return {
          url: `/task`,
          method: "GET",
          params: { search: searchQuery },
        };
      },
    }),
  }),
});
export const { useGetTaskQuery } = extendedApi;
