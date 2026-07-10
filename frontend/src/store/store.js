import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
   reducer: {
      // Подключаем API через его редьюсер
      [apiSlice.reducerPath]: apiSlice.reducer,
   },
   // Обязательно добавляем middleware для работы кэширования RTK Query
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
});
