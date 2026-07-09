import { useState } from 'react'
import styles from './Register.module.css'
import { Link } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    isAgree: false
  });

  const handleChangeFormData = (e) => {
    setFormData((currentFormData) => {
      return { ...currentFormData, [e.target.name]: e.target.value }
    })
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className={`${styles.registerContainer}`}>
      {/* Левая сторона */}
      <div className={styles.illustration}>
      </div>

      {/* Правая сторона */}
      <div className={`${styles.formWrapper}`}>
        <h2>Регистрация</h2>
        <p className={`${styles.subTitle}`}>Эффективно управляйте всеми своими запасами.</p>

        <form onSubmit={handleFormSubmit} className={`${styles.registerForm}`}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name='firstName'
              value={formData.firstName}
              placeholder='Введите имя'
              onChange={handleChangeFormData}
            />
            <input
              type="text"
              name='lastName'
              value={formData.lastName}
              placeholder='Введите фамилию'
              onChange={handleChangeFormData}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name='email'
              value={formData.email}
              placeholder='example@gmail.com'
              onChange={handleChangeFormData}
            />
            <input
              type="phone"
              name='phone'
              value={formData.phone}
              placeholder='+7 900 758 6782'
              onChange={handleChangeFormData}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Минимум 8 символов"
              onChange={handleChangeFormData}
            />
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name='isAgree'
              checked={formData.isAgree}
              onChange={(e) => setFormData({...formData, isAgree: e.target.checked})}
            />
            <span>Я согласен со всеми условиями, политикой конфиденциальности и тарифами.</span>
          </label>

          <button className={styles.signUpBtn} type="submit">
            Зарегистрироваться
          </button>

          <p>
            Уже есть аккаунт? <Link to={`/login`}>Войти</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
