import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTechnology: build.query({
      query: () => ({
        url: "/technology",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetTechnologyQuery } = extendedApi;