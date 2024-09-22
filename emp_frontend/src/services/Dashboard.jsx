import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Dashboard = createApi({
  reducerPath: "Dashboard",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/dashboard/",
  }),
  endpoints: (builder) => ({
    fetchAttendance: builder.mutation({
      query: (access_token) => ({
        url: "attendanceCount/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchTasks: builder.mutation({
      query: (access_token) => ({
        url: "todaytask/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    createTask: builder.mutation({
      query: ({ data, access_token }) => ({
        url: "todaytask/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${access_token}`,
          // "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useFetchAttendanceMutation,
  useCreateTaskMutation,
  useFetchTasksMutation,
} = Dashboard;
