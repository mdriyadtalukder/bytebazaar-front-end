import { apiSlice } from "../api/apiSlice";

export const favoriteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addFavorite: builder.mutation({
            query: ( data ) => ({
                url: '/favorites',
                method: "POST",
                body: data,
            }),
            invalidatesTags:['favorite','laptops','cart']
        }),
        getFavorite: builder.query({
            query: (email) => ({
                url: `/favorites?email=${email}`,
                method: "GET",
            }),
            providesTags: ['favorite']
        }),
        deleteFavorite: builder.mutation({
            query: (id) => ({
                url: `/favorites/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['favorite','laptops','cart']

        }),
    })
})
export const { useAddFavoriteMutation,useGetFavoriteQuery,useDeleteFavoriteMutation } = favoriteApi;