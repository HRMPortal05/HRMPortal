import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LeaveManagement = createApi({
  reducerPath: "LeaveManagement",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/leavemanagement/",
  }),
  endpoints: (builder) => ({
    createleave: builder.mutation({
      query: ({ data, access_token }) => {
        return {
          url: "createLeave/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    fetchleave: builder.mutation({
      query: (access_token) => {
        return {
          url: "createLeave/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreateleaveMutation, useFetchleaveMutation } =
  LeaveManagement;
