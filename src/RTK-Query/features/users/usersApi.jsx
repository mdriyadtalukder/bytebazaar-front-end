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
        addUsers: builder.mutation({
            query: (data) => ({
                url: '/users',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['users']
        }),
        makeAdmin: builder.mutation({
            query: (id) => ({
                url: `/users/admin/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['users']

        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['users']

        }),
    })
})
export const { useGetUsersQuery, useAddUsersMutation, useMakeAdminMutation, useDeleteUserMutation } = usersApi;