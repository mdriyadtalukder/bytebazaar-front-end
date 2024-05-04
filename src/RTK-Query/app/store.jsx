import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import reviewsSlice from "../features/reviews/reviewsSlice";
import allProductSlice from "../features/allProduct/allProductSlice";
import favoriteSlice from "../features/favorite/favoriteSlice";
import relatedSlice from "../features/related/relatedSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        reviews: reviewsSlice,
        allProduct: allProductSlice,
        favorite: favoriteSlice,
        related: relatedSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware)

})