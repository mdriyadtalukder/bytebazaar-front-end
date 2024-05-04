import { apiSlice } from "../api/apiSlice";
export const allProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => ({
                url: '/alllaptops',
                method: "GET",
            }),
            providesTags: ['laptops']
        }),
        getAProduct: builder.query({
            query: (id) => ({
                url: `/alllaptops/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [
                { type: "laptop", id: arg }
            ]
        }),
        editLaptop: builder.mutation({
            query: ({ id, data }) => ({
                url: `/alllaptops/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "laptops", 'cart',
                { type: "laptop", id: arg.id }
            ],

        }),
        getCart: builder.query({
            query: (email) => ({
                url: `/cart?email=${email}`,
                method: "GET",
            }),
            providesTags: ['cart']
        }),
        addToCart: builder.mutation({
            query: (data) => ({
                url: '/cart',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart'],

        }),

        editCart: builder.mutation({
            query: ({ id, data }) => ({
                url: `/cart/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "laptops", 'cart',
                { type: "laptop", id: arg.id }
            ],

        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['cart']

        }),
    })
})
export const { useGetAllProductQuery, useGetAProductQuery, useAddToCartMutation, useGetCartQuery, useEditCartMutation, useDeleteCartMutation, useEditLaptopMutation } = allProductApi;