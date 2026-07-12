import { createBrowserRouter } from "react-router";
import PublicLayout from "./routes/PublicLayout";
import Login from "./pages/Login/Login";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import MainLayout from "./Layout/MainLayout/MainLayout";


export const router = createBrowserRouter([
   // Гостевая зона (Защищенная от авторизованных)
   {
      element: <PublicLayout/>,
      children: [
         {
            path: '/login',
            element: <Login/>
         },
         {
            path: '/create-employee',
            element: <CreateEmployee/>
         }
      ]
   },

   // Приватная зона CRM (Защищенная от гостей)
   {
      path: '/',
      element: <MainLayout/>
   }
])