import React from 'react'
import { Navigate, Outlet } from 'react-router'

const PublicLayout = () => {
   // const { data, isLoading, isFetching, isSuccess } = useGetMeQuery();

   // Пока идет проверка — просто отдаем пустоту, не редиректим раньше времени
   // if (isLoading || isFetching) return null;

   // Если проверка прошла успешно и юзер авторизован — не даем открыть /login, швыряем в CRM
   // if (isSuccess && data?.success) {
   //    return <Navigate to={`/dashboard`} replace />
   // }

   return <Outlet />
}

export default PublicLayout
