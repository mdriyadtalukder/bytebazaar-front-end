import { apiSlice } from "../api/apiSlice";

export const checkoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCheckout: builder.query({
            query: (email) => ({
                url: `/checkout?email=${email}`,
                method: "GET",
            }),
            providesTags: ['checkout']
        }),
        addCheckout: builder.mutation({
            query: (data) => ({
                url: '/checkout',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['checkout', 'cart']
        }),

        deleteCheckout: builder.mutation({
            query: (id) => ({
                url: `/checkout/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['checkout', 'cart']

        }),
    })
})
export const { useGetCheckoutQuery, useAddCheckoutMutation, useDeleteCheckoutMutation } = checkoutApi;