import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/deleteTask`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const { useDeleteTaskMutation } = extendedApi;
