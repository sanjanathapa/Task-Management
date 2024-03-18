import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTask: builder.mutation({
      query: ({ task, id }) => ({
        url: `/task/${id}`,
        method: "PUT",
        body: { task },
      }),
    }),
  }),
});

export const { useUpdateTaskMutation } = extendedApi;
