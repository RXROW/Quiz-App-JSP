import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH } from '../../services/apis/apisUrls';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://upskilling-egypt.com:3005/api', 
  }),
  endpoints: (builder) => ({
    register: builder.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: AUTH.REGISTER,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: AUTH.LOGIN,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<void, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: AUTH.CHANGE_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: AUTH.LOGOUT,
        method: 'POST',
      }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<void, { token: string; newPassword: string }>({
      query: (body) => ({
        url: AUTH.RESET_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
