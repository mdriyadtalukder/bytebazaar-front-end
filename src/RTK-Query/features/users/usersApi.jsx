import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                method: "GET",
            }),
            providesTags: ['users']
        }),
        getUser: builder.query({
            query: (email) => ({
                url: `/user?email=${email}`,
                method: "GET",
            }),
            providesTags: ['user']
        }),
        addUsers: builder.mutation({
            query: (data) => ({
                url: '/users',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['users', 'user']
        }),
        makeAdmin: builder.mutation({
            query: (id) => ({
                url: `/users/admin/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['users', 'user']

        }),
        makeSeller: builder.mutation({
            query: (id) => ({
                url: `/users/seller/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['users', 'user']

        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['users', 'user']

        }),
    })
})
export const { useGetUsersQuery, useAddUsersMutation, useMakeAdminMutation, useDeleteUserMutation, useGetUserQuery, useMakeSellerMutation } = usersApi;