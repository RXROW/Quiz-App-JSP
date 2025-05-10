import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, AUTH } from "../../services/apis/apisUrls";

export const AuthApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH.LOGIN,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: AUTH.REGISTER,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: AUTH.FORGOT_PASSWORD,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: AUTH.RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: AUTH.CHANGE_PASSWORD,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = AuthApiSlice;
