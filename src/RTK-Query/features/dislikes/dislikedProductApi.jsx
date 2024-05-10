import { apiSlice } from "../api/apiSlice";

export const dislikedProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDislikedProduct: builder.query({
            query: (email) => ({
                url: `/dislikes?email=${email}`,
                method: "GET",
            }),
            providesTags: ['dislikes']
        }),
        addDislikedProduct: builder.mutation({
            query: (data) => ({
                url: '/dislikes',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['laptops', 'likes', 'dislikes'],
            // async onQueryStarted({ id, ...patch }, { queryFulfilled, dispatch }) {
            //     try {
            //         // pessimistic updates cache
            //         dispatch(apiSlice.util.updateQueryData("getDislikedProduct", undefined, (draft) => {
            //             draft.push(patch)
            //         }))
            //     } catch (error) {
            //         //
            //     }
            // }

        }),
        updateDislikes: builder.mutation({
            query: ({ id, data }) => ({
                url: `/all_laptop/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                'laptops', 'likes', 'dislikes',
                { type: 'laptop', id: arg.id }
            ],
            // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {

            //     try {

            //         // pessimistic updates cache for single task
            //         dispatch(apiSlice.util.updateQueryData("getAProduct", id, (draft) => {
            //             Object.assign(draft, patch);
            //         }))

            //     } catch (error) {
            //         //
            //     }

            // },

        }),
        deleteDislikedProduct: builder.mutation({
            query: (id) => ({
                url: `/dislikes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                'laptops', 'likes', 'dislikes',
                { type: 'laptop', id: arg.id }
            ]

        }),
    })
})
export const { useGetDislikedProductQuery, useAddDislikedProductMutation, useDeleteDislikedProductMutation, useUpdateDislikesMutation } = dislikedProductApi;