/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../../authentication/firebase/firebase.config";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const apiSlice = createApi({
    reducerPath: 'project',
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401 || result?.error?.status === 403) {

            await auth.signOut();
            window.location.href = '/login';


        }
        return result;
    },
    tagTypes: ['laptops', 'laptop', 'cart', 'favorite', 'likes', 'dislikes', 'checkout', 'payments', 'allpayment', 'users', 'user'],
    endpoints: (builder) => ({}),

})