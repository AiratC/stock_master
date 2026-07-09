import { createBrowserRouter } from "react-router";
import PublicLayout from "./routes/PublicLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";


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
            path: '/register',
            element: <Register/>
         }
      ]
   }

   // Приватная зона CRM (Защищенная от гостей)
   // {
   //    element:
   // }
])