import { configureStore } from "@reduxjs/toolkit";
import { advertisementApi } from "./advertismentApi";

export const store = configureStore({
  reducer: {
    [advertisementApi.reducerPath]: advertisementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(advertisementApi.middleware),
});
