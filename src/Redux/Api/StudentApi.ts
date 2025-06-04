import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, STUDENT } from "../../services/apis/apisUrls";

export const StudentApiSlice = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, ) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => STUDENT.GET_ALL,
    }),
    getStudentById: builder.query({
      query: (id: string) => STUDENT.GET_BY_ID(id),
    }),
    getStudentsWithoutGroup: builder.query({
      query: () => STUDENT.GET_ALL_WITHOUT_GROUP,
    }),
    getTopFiveStudents: builder.query({
      query: () => STUDENT.GET_TOP_FIVE_STUDENTS,
    }),
    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: STUDENT.DELETE_STUDENT(id),
        method: "DELETE",
      }),
    }),
    deleteFromGroup: builder.mutation({
      query: ({ id, id2 }: { id: string; id2: string }) => ({
        url: STUDENT.DELETE_FROM_GROUP(id, id2),
        method: "DELETE",
      }),
    }),
    addToGroup: builder.mutation({
      query: ({ id, id2 }: { id: string; id2: string }) => ({
        url: STUDENT.ADD_TO_GROUP(id, id2),
        method: "POST",
      }),
    }),
    updateStudentGroup: builder.mutation({
      query: ({ id, id2 }: { id: string; id2: string }) => ({
        url: STUDENT.UPDATE_STUDENT_GROUP(id, id2),
        method: "PUT",
      }),
    }),
    updateMyAccount: builder.mutation({
      query: (data) => ({
        url: STUDENT.UPDATE_MY_ACC,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useGetStudentsWithoutGroupQuery,
  useGetTopFiveStudentsQuery,
  useDeleteStudentMutation,
  useDeleteFromGroupMutation,
  useAddToGroupMutation,
  useUpdateStudentGroupMutation,
  useUpdateMyAccountMutation,
} = StudentApiSlice;
