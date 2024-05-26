import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: (email) => ({
                url: `/payment?email=${email}`,
                method: "GET",
            }),
            providesTags: ['payments']
        }),
        addPayment: builder.mutation({
            query: (data) => ({
                url: '/payment',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart', 'payments']
        }),
        addStripe: builder.mutation({
            query: (data) => ({
                url: '/create-payment-intent',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart', 'payments']
        }),

    })
})
export const { useAddPaymentMutation, useAddStripeMutation, useGetPaymentsQuery } = paymentApi;