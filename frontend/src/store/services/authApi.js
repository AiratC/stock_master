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
      }),
      // Вход
      login: builder.mutation({
         query: (credentials) => ({
            url: '/auth/login',
            method: 'POST',
            body: credentials,
         }),
         invalidatesTags: ['User'], // Сбрасываем кэш юзера при входе
      }),
   })
})

export const {
   useCreateEmployeeMutation,
   useLoginMutation
} = authApi;