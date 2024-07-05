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
        getPurchaseCoinsRecords: builder.query({
            query: () => ({
                url: '/recordsCoins',
                method: "GET",
            }),
            providesTags: ['records']
        }),
        getCoinsProducts: builder.query({
            query: () => ({
                url: '/coinsProducts',
                method: "GET",
            }),
            providesTags: ['coinsproducts']
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
        getCoin: builder.query({
            query: (email) => ({
                url: `/coins?email=${email}`,
                method: "GET",
            }),
            providesTags: ['coin']
        }),
        getPurchaseCoinRecord: builder.query({
            query: (email) => ({
                url: `/recordCoin?email=${email}`,
                method: "GET",
            }),
            providesTags: ['record']
        }),
        addCoin: builder.mutation({
            query: (data) => ({
                url: '/coins',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['coin'],

        }),
        addPurchaseCoinsRecords: builder.mutation({
            query: (data) => ({
                url: '/recordsCoins',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['record', 'records'],

        }),
        editPurchaseCoinsRecords: builder.mutation({
            query: ({ id, data }) => ({
                url: `/recordsCoins/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['record', 'records'],

        }),
        editCoin: builder.mutation({
            query: ({ id, data }) => ({
                url: `/coins/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['coin'],

        }),
        editCoinsProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/coinsProducts/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['coin', 'coinsproducts'],

        }),
        addLaptop: builder.mutation({
            query: (data) => ({
                url: '/alllaptops',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'cart'],

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
        updateLaptop: builder.mutation({
            query: ({ id, data }) => ({
                url: `/alllaptop/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "laptops", 'cart',
                { type: "laptop", id: arg.id }
            ],

        }),
        decreaseLaptop: builder.mutation({
            query: ({ id, data }) => ({
                url: `/descreaselaptops/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "laptops", 'cart',
                { type: "laptop", id: arg.id }
            ],

        }),
        deleteLaptop: builder.mutation({
            query: (id) => ({
                url: `/alllaptops/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['favorite', 'laptops', 'cart']

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
        deletePurchaseCoinsRecords: builder.mutation({
            query: (id) => ({
                url: `/recordsCoins/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['record', 'records']

        }),
    })
})
export const { useGetAllProductQuery, useGetCoinsProductsQuery, useGetAProductQuery, useGetCoinQuery, useGetPurchaseCoinRecordQuery, useGetPurchaseCoinsRecordsQuery, useAddToCartMutation, useGetCartQuery, useEditCartMutation, useDeleteCartMutation, useEditLaptopMutation, useAddLaptopMutation, useUpdateLaptopMutation, useDeleteLaptopMutation, useDecreaseLaptopMutation, useAddCoinMutation, useEditCoinMutation, useEditCoinsProductMutation, useAddPurchaseCoinsRecordsMutation,useEditPurchaseCoinsRecordsMutation, useDeletePurchaseCoinsRecordsMutation } = allProductApi;