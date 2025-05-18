import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../ApiStore/Api";
import QuestionReducer from "../QuestionSlice/QuestionSlice";
import authReducer from "../AuthanticationSlice/AuthSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    Question: QuestionReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});
setupListeners(store.dispatch);
