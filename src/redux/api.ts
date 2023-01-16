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
  User,
  Transaction,
  Student,
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
          )) as {
            data: { token: string; id: number; role: "admin" | "student" };
          };
          if (refreshResult.data) {
            api.dispatch(
              login({
                accessToken: refreshResult.data.token,
                role: refreshResult.data.role,
              })
            );
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
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        id: number;
        role: "admin" | "student";
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
    getUser: builder.query<User, void>({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
    }),
    getStudents: builder.query<Student[], void>({
      query: () => ({
        url: `/user/students`,
        method: "GET",
      }),
      providesTags: ["Student"],
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
    getBusinesses: builder.query<Business[], void>({
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
    postTransaction: builder.mutation<
      Transaction,
      { title: string; amount: number; userId: number }
    >({
      query: (body) => ({
        url: "/bank/transaction",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
    postBusiness: builder.mutation<
      Business,
      {
        title: string;
        description: string;
        opensAt: string;
        closesAt: string;
        location: string;
        icon: string;
      }
    >({
      query: (body) => ({
        url: "/business",
        method: "POST",
        body,
      }),
    }),
    postNewsPost: builder.mutation<
      NewsPost,
      {
        title: string;
        body: string;
      }
    >({
      query: (body) => ({
        url: "/newspaper",
        method: "POST",
        body,
      }),
    }),
    postJobListing: builder.mutation<
      JobListing,
      {
        title: string;
        body: string;
        businessId: number;
      }
    >({
      query: (body) => ({
        url: "/job",
        method: "POST",
        body,
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
  useGetUserQuery,
  useGetStudentsQuery,
  useGetTransactionsQuery,
  useGetMailsQuery,
  useGetBusinessesQuery,
  useGetNewsPostsQuery,
  useGetJobListingsQuery,
  usePostTransactionMutation,
  usePostBusinessMutation,
  usePostNewsPostMutation,
  usePostJobListingMutation,
  usePostJobApplicationMutation,
} = api;
