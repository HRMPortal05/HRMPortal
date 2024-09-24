import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Attendance = createApi({
  reducerPath: "Attendance",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/attendance/",
  }),
  endpoints: (builder) => ({
    fetchAttendance: builder.mutation({
      query: (access_token) => ({
        url: "attendance/user/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const { useFetchAttendanceMutation } = Attendance;
