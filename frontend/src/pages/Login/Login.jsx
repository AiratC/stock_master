import { useState } from 'react'
import styles from './Login.module.css'

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      rememberMe: false
   });

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }));
   };

   const handleFormSubmit = (e) => {
      e.preventDefault();
   }

   return (
      <div className={styles.loginContainer}>
         {/* Секция с формой (теперь слева) */}
         <div className={styles.formWrapper}>
            <div className={styles.contentInner}>
               <h2>Вход</h2>
               <p className={styles.subTitle}>Отслеживайте свой рост и получайте поддержку!</p>

               <form onSubmit={handleFormSubmit} className={styles.loginForm}>
                  <button type="button" className={styles.googleBtn}>
                     Войти через Google
                  </button>

                  <div className={styles.inputField}>
                     <input
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Введите email"
                        onChange={handleChange}
                     />
                  </div>

                  <div className={styles.inputField}>
                     <input
                        name="password"
                        type="password"
                        placeholder="Минимум 8 символов"
                        onChange={handleChange}
                     />
                  </div>

                  <div className={styles.formOptions}>
                     <label htmlFor='rememberMe' className={styles.checkbox}>
                        <input
                           id='rememberMe'
                           type="checkbox"
                           name="rememberMe"
                           checked={formData.rememberMe}
                           onChange={handleChange}
                        />
                        Запомнить меня
                     </label>
                     <a href="/forgot-password">Забыли пароль?</a>
                  </div>

                  <button type="submit" className={styles.loginBtn}>Войти</button>
               </form>

               <p className={styles.footerLink}>
                  Ещё нет аккаунта? <a href="/register">Создать аккаунт</a>
               </p>
            </div>
         </div>

         {/* Иллюстрация (теперь справа и больше) */}
         <div className={styles.illustration}></div>
      </div>
   )
}

export default Login
