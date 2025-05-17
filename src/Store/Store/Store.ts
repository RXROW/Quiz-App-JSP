import { configureStore } from "@reduxjs/toolkit";
import { AuthApiSlice } from "../Authantication/AuthApi";
import authReducer from "../Authantication/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
        [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
        // [StudentApiSlice.reducerPath]: StudentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApiSlice.middleware)
      // .concat(StudentApiSlice.middleware)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
