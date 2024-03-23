import { getQueryParamString } from "./helpers";
import { api } from "./index";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTask: build.query({
      query: (searchQuery = "") => {
        
        let queryObject = { name: searchQuery };
        !searchQuery.length && delete queryObject.name;

        const queryParamString = getQueryParamString(queryObject);
        
        return {
          url: `/task${queryParamString}`,
          method: "GET"
        }
      }
    }),
  }),
});
export const { useGetTaskQuery } = extendedApi;
