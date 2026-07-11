import { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../../store/services/authApi';

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      rememberMe: false
   });
   const navigate = useNavigate();

   const [login, { isLoading }] = useLoginMutation();

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }));
   };

   const handleFormSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = formData;
      if (!email.trim() || !password.trim()) {
         return toast.error("Заполните все поля")
      }

      if (password.length < 8) {
         return toast.error('Пароль должен быть не меньше 8 символов')
      }

      try {
         const response = await login(formData).unwrap();
         console.log(response);
         if (response?.success) {
            toast.success(response.message);
            navigate('/dashboard')
         }
      } catch (error) {
         console.log(error);
         // Берем сообщение из ответа сервера, если оно есть, иначе дефолтная фраза
         const message = error?.data?.message || "Ошибка входа, попробуйте позже";
         toast.error(message);
      }
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
                     <Link to="/forgot-password">Забыли пароль?</Link>
                  </div>

                  <button disabled={isLoading} type="submit" className={styles.loginBtn}>Войти</button>
               </form>

            </div>
         </div>

         {/* Иллюстрация (теперь справа и больше) */}
         <div className={styles.illustration}></div>
      </div>
   )
}

export default Login
