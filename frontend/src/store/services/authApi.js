import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // Регистрация
      register: builder.mutation({
         query: (userData) => ({
            url: '/register',
            method: 'POST',
            body: userData
         })
      })
   })
})

export const {
   useRegisterMutation
} = authApi;