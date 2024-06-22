import { configureStore } from "@reduxjs/toolkit";
import { advertisementApi } from "./advertismentAPI";
export const store = configureStore({
  reducer: {
    [advertisementApi.reducerPath]: advertisementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(advertisementApi.middleware),
});
