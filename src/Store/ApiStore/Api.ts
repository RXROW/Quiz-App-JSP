import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, AUTH, QUESTION } from "../../services/APi/apisUrls";

export const ApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Group", "Student", "Question", "Quiz"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH.LOGIN,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
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
        body: email,
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
        method: "POST",
        body: data,
      }),
    }),
    getQuestions: builder.query({
      query: () => QUESTION.GET_ALL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Question", id })),
              { type: "Question", id: "LIST" },
            ]
          : [{ type: "Question", id: "LIST" }],
    }),
    getQuestionById: builder.query({
      query: (id) => QUESTION.GET_BY_ID(id),
      providesTags: (result, error, id) => [{ type: "Question", id }],
    }),
    createQuestion: builder.mutation({
      query: (questionData) => ({
        url: QUESTION.CREATE_QUESTION,
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
      // invalidatesTags: ["Question"],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: QUESTION.UPDATE_QUESTION(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: QUESTION.DELETE_QUESTION(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),
    searchQuestions: builder.query({
      query: (params) => ({
        url: QUESTION.SEARCH_QUESTION,
        params,
      }),
      providesTags: [{ type: "Question", id: "SEARCH" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useSearchQuestionsQuery,
} = ApiSlice;
