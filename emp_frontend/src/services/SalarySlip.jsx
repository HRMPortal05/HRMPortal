import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SalarySlip = createApi({
  reducerPath: "SalarySlip",
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://ems-igdr.onrender.com/salaryslip/`,
    baseUrl: `https://hrm-portal-backend.vercel.app/salaryslip/`,
  }),
  endpoints: (builder) => ({
    generateSalarySlip: builder.mutation({
      query: ({ data, access_token }) => {
        return {
          url: "generateSalarySlip/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    fetchSalarySlips: builder.mutation({
      query: ({ email, access_token }) => {
        return {
          url: "salarySlips/",
          method: "POST",
          body: { email },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const { useGenerateSalarySlipMutation, useFetchSalarySlipsMutation } =
  SalarySlip;
