import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteTaskMutation } = extendedApi;
