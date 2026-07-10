import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // Создание сотрудника
      createEmployee: builder.mutation({
         query: (userData) => ({
            url: '/auth/create-employee',
            method: 'POST',
            body: userData
         })
      })
   })
})

export const {
   useCreateEmployeeMutation
} = authApi;