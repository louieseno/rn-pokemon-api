import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthFormType } from 'src/screens/auth/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: async (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user: AuthFormType) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user: AuthFormType) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    })
  }),
});

export const { useRegisterMutation, useLoginMutation } = apiSlice;
