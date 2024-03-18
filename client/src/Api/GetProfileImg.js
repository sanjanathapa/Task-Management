import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getImage: build.query({
      query: (id) => {
        return {
          url: `/profile/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetImageQuery } = extendedApi;
