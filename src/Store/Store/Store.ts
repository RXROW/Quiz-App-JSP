import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../ApiStore/Api";
import QuestionReducer from "../QuestionSlice/QuestionSlice";
import authReducer from "../AuthanticationSlice/AuthSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { StudentApiSlice } from "../../Redux/Api/StudentApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    Question: QuestionReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [StudentApiSlice.reducerPath]: StudentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ApiSlice.middleware)
      .concat(StudentApiSlice.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;