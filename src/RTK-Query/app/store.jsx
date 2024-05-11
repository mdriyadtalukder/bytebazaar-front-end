import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import reviewsSlice from "../features/reviews/reviewsSlice";
import allProductSlice from "../features/allProduct/allProductSlice";
import favoriteSlice from "../features/favorite/favoriteSlice";
import relatedSlice from "../features/related/relatedSlice";
import likeProductSlice from "../features/likes/likeProductSlice";
import dislikedProductSlice from "../features/dislikes/dislikedProductSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        reviews: reviewsSlice,
        allProduct: allProductSlice,
        favorite: favoriteSlice,
        related: relatedSlice,
        likes: likeProductSlice,
        dislikes: dislikedProductSlice,
        users: usersSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware)

})