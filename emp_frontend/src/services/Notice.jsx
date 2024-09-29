import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Notice = createApi({
  reducerPath: "Notice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/notice/`,
  }),
  endpoints: (builder) => ({
    fetchNotice: builder.mutation({
      query: (access_token) => ({
        url: "notices/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    createNotice: builder.mutation({
      query: ({ data, access_token }) => ({
        url: "notices/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    deleteNotice: builder.mutation({
      query: ({ id, access_token }) => ({
        url: `notices/${id}/`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const {
  useFetchNoticeMutation,
  useCreateNoticeMutation,
  useDeleteNoticeMutation,
} = Notice;
