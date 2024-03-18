import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    addTask: build.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddTaskMutation } = extendedApi;
