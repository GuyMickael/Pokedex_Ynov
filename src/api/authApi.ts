import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers) => {
    // On récupère l'access_token (le jeton court)
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // On ne stocke QUE l'accessToken.
          // Le refreshToken est géré par le cookie via le navigateur.
          localStorage.setItem("access_token", data.accessToken);
        } catch (err) {
          console.error("Erreur de login", err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
        // Pas besoin de body ou de headers manuels ici !
        // Le navigateur enverra le cookie refreshToken tout seul grâce à credentials: "include"
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("access_token", data.accessToken);
        } catch (err) {
          // Si le refresh échoue, on nettoie tout
          console.log(err);
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApi;
