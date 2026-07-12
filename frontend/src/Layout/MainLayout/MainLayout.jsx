import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import styles from './MainLayout.module.css'

const MainLayout = () => {
   const [isSidebarOpen, setIsSideBarOpen] = useState(false);
   const navigate = useNavigate();
   // const [logout, { isLoading }] = useLogoutMutation();
   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
   }, [theme])

   const toggleTheme = useCallback(() => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark": "light"))
   }, [])

   const handleLogout = useCallback(() => {
      console.log("handleLogout")
   }, []);

   return (
      <div className={styles.layoutWrapper}>
         <button
            className={styles.menuToggle}
            onClick={() => setIsSideBarOpen(!isSidebarOpen)}
         >
            { isSidebarOpen ? <X size={24}/> : <Menu size={24} /> }
         </button>
      </div>
   )
}

export default MainLayout
