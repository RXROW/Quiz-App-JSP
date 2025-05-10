import { configureStore } from "@reduxjs/toolkit";
import { AuthApiSlice } from "../Authantication/AuthApi";

export const store = configureStore({
  reducer: {
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApiSlice.middleware),
});
