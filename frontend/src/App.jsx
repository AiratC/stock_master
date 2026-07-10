import { RouterProvider } from "react-router"
import { router } from "./route"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      {/* Настройки тостов: стильный темный дизайн */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
