import { apiSlice } from "../api/apiSlice";

export const relatedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRelated: builder.query({
            query: (id) => ({
                url: `/related/${id}`,
                method: "GET",
            }),
        })
    })
})
export const { useGetRelatedQuery } = relatedApi;