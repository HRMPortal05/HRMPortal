import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Dashboard = createApi({
  reducerPath: "Dashboard",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/dashboard/`,
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
    deleteTask: builder.mutation({
      query: ({ task_id, access_token }) => ({
        url: `delete/${task_id}/`, // API endpoint for task deletion
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const {
  useFetchAttendanceMutation,
  useCreateTaskMutation,
  useFetchTasksMutation,
  useDeleteTaskMutation,
} = Dashboard;
