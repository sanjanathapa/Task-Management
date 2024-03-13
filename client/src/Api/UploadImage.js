import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation({
      query: (data) => ({
        url: "/uploadfile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useUploadImageMutation } = extendedApi;
