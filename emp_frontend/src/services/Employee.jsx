import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Employee = createApi({
  reducerPath: "Employee",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/employee/",
  }),
  endpoints: (builder) => ({
    fetchEmployee: builder.mutation({
      query: ({ emp_id, access_token }) => ({
        url: `fetchEmployee/${emp_id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const { useFetchEmployeeMutation } = Employee;
