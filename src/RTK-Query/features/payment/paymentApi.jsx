import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: (email) => ({
                url: `/payment/${email}`,
                method: "GET",
            }),
            providesTags: ['payments']
        }),
        getAllPayment: builder.query({
            query: () => ({
                url: '/payments',
                method: "GET",
            }),
            providesTags: ['allpayment'],
        }),
        addPayment: builder.mutation({
            query: (data) => ({
                url: '/payment',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart', 'payments', 'allpayment']
        }),
        addStripe: builder.mutation({
            query: (data) => ({
                url: '/create-payment-intent',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart', 'payments', 'allpayment']
        }),
        getBkashSucess: builder.query({
            query: () => ({
                url: '/bkashSucess',
                method: "GET",
            })
        }),
        changeStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/payment/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart', 'payments', 'allpayment']

        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/payment/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['laptops', 'cart', 'payments', 'allpayment']

        }),
        deleteBkashSuccess: builder.mutation({
            query: (id) => ({
                url: `/bkashSucess/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['laptops', 'cart', 'payments', 'allpayment']

        }),

    })
})
export const { useAddPaymentMutation, useAddStripeMutation, useGetPaymentsQuery, useGetAllPaymentQuery, useChangeStatusMutation, useDeletePaymentMutation, useDeleteBkashSuccessMutation, useGetBkashSucessQuery } = paymentApi;