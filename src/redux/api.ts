import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../constants";
import { login, logout } from "./sessionSlice";
import { RootState } from "./store";
import { Mutex } from "async-mutex";
import {
  Business,
  JobApplication,
  JobListing,
  Mail,
  NewsPost,
  Student,
  Transaction,
} from "../types";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState;
    const token = state.session.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.meta && result.meta.response?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = (await baseQuery(
            "auth/refresh",
            api,
            extraOptions
          )) as { data: { token: string; id: number } };
          if (refreshResult.data) {
            api.dispatch(login({ accessToken: refreshResult.data.token }));
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
    return result;
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth(baseQuery),
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        id: number;
        token: string;
      },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getStudent: builder.query<Student, void>({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: `/bank/transactions`,
        method: "GET",
      }),
    }),
    getMails: builder.query<Mail[], void>({
      query: () => ({
        url: `/mail`,
        method: "GET",
      }),
    }),
    getBussinesses: builder.query<Business[], void>({
      query: () => ({
        url: `/business`,
        method: "GET",
      }),
    }),
    getNewsPosts: builder.query<NewsPost[], void>({
      query: () => ({
        url: `/newspaper`,
        method: "GET",
      }),
    }),
    getJobListings: builder.query<JobListing[], void>({
      query: () => ({
        url: `/job`,
        method: "GET",
      }),
    }),
    postJobApplication: builder.mutation<
      JobApplication,
      { body: string; jobListingId: number }
    >({
      query: (body) => ({
        url: "/job/jobApplication",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetStudentQuery,
  useGetTransactionsQuery,
  useGetMailsQuery,
  useGetBussinessesQuery,
  useGetNewsPostsQuery,
  useGetJobListingsQuery,
  usePostJobApplicationMutation,
} = api;
