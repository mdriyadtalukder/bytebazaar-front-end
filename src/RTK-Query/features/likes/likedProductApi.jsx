import { apiSlice } from "../api/apiSlice";

export const likedProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLikedProduct: builder.query({
            query: (email) => ({
                url: `/likes?email=${email}`,
                method: "GET",
            }),
            providesTags: ['likes']
        }),
        addLikedProduct: builder.mutation({
            query: (data) => ({
                url: '/likes',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'likes', 'dislikes']
        }),
        updateLikes: builder.mutation({
            query: ({ id, data }) => ({
                url: `/all_laptops/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                'laptops', 'likes', 'dislikes',
                { type: 'laptop', id: arg.id }
            ]

        }),
        deleteLikedProduct: builder.mutation({
            query: (id) => ({
                url: `/likes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                'laptops', 'likes', 'dislikes',
                { type: 'laptop', id: arg.id }
            ]

        }),
    })
})
export const { useGetLikedProductQuery, useAddLikedProductMutation, useDeleteLikedProductMutation,useUpdateLikesMutation } = likedProductApi;