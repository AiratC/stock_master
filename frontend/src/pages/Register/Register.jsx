import { useState } from 'react'
import styles from './Register.module.css'
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../../store/services/authApi';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    isAgree: false
  });

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleChangeFormData = (e) => {
    setFormData((currentFormData) => {
      return { ...currentFormData, [e.target.name]: e.target.value }
    })
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password, isAgree } = formData;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      return toast.error('Заполните все поля')
    };

    if (password.length < 8) {
      return toast.error('Пароль должен быть не меньше 8 символов')
    }

    if (!isAgree) {
      return toast.error('Подтвердите согласие')
    }

    try {
      const body = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        is_agree: formData.isAgree
      };

      const response = await register(body).unwrap();
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login')
      }
    } catch (error) {
      const message = error?.data?.message || 'Что-то пошло не так';
      toast.error(message);
    }

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
              type="tel"
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
              onChange={(e) => setFormData({ ...formData, isAgree: e.target.checked })}
            />
            <span>Я согласен со всеми условиями, политикой конфиденциальности и тарифами.</span>
          </label>

          <button disabled={isLoading} className={styles.signUpBtn} type="submit">
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
