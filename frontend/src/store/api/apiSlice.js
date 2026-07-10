import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
      prepareHeaders: (headers) => {
         headers.set('Content-Type', 'application/json');
         return headers;
      },
      credentials: 'include', // Позволяет отправлять куки
   }),
   tagTypes: [
      "User"
   ],
   endpoints: () => ({})
})