import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { AuthFormType } from 'src/screens/auth/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: async (headers, { getState }) => {
    // const token = (getState() as RootState).user.;
    // if (token) {
    //  headers.set('authorization', `Bearer ${token}`);
    // }
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
  }),
});

export const { useRegisterMutation } = apiSlice;
