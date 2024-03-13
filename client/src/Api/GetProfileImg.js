import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getImage: build.query({
      query: (id) => {
        console.log(id, "idddddddddddddddddddddddd");
        return {
          url: `/profile?id=${id}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useLazyGetImageQuery } = extendedApi;
