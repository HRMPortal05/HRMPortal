import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (registerData) => {
        return {
          url: "register/",
          method: "POST",
          body: registerData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (loginData) => {
        return {
          url: "login/",
          method: "POST",
          body: loginData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    forgotpassword: builder.mutation({
      query: (forgotPasswordData) => {
        return {
          url: "send-reset-password-email/",
          method: "POST",
          body: forgotPasswordData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    changepassword: builder.mutation({
      query: ({ data, access_token }) => {
        return {
          url: "changepassword/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    resetpassword: builder.mutation({
      query: ({ data, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useChangepasswordMutation,
} = UserAuthApi;