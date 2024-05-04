import { apiSlice } from "../api/apiSlice";

export const reviewsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => ({
                url: '/reviews',
                method: "GET",
            }),
        })
    })
})
export const { useGetReviewsQuery } = reviewsApi;