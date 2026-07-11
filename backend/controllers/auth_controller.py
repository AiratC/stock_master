from fastapi import HTTPException, Response

from sql_queries.auth_queries import create_user_and_get_data
from sql_queries.auth_queries import findUserByEmail
from utils.password import get_password_hash
from utils.password import verify_password
from utils.jwt_handler import create_access_token

from datetime import timedelta


async def create_employee_user_controller(db, user_data):
    # Подготавливаем данные
    params = {
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "email": user_data.email,
        "phone": user_data.phone,
        "hash_password": get_password_hash(user_data.password),
        "is_agree": user_data.is_agree,
        "role_id": user_data.role_id,
    }

    # Получаем данные пользователя из репозитория
    user_data_from_db = await create_user_and_get_data(db, params)

    # Возвращаем строго по твоему формату
    return {
        "success": True,
        "message": "Успешная регистрация",
        "user": dict(user_data_from_db),  # Конвертируем RowMapping в обычный словарь
    }


async def login(user_data, db, response: Response):
    print(f"user_data: {user_data}")
    email_lower = user_data.email.lower()
    rememberMe = user_data.rememberMe
    password = user_data.password

    # Меняем имя переменной на user_record
    user_record = await findUserByEmail(db, email_lower)
    print(f"user_record: {user_record}")

    # Проверяем пароль и пользователя
    if not user_record or not verify_password(password, user_record["hash_password"]):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

    # 3. Настройка времени жизни
    # rememberMe = True -> 30 дней, иначе -> 7 дней
    expires = timedelta(days=30) if rememberMe else timedelta(days=7)

    # 4. Формирование данных токена
    token_data = {
        "sub": str(user_record["id"]),  # ID пользователя
        "role": user_record[
            "role_name"
        ],  # Role name из JOIN (убедись, что оно есть в user_record)
    }

    # 5. Создание токена
    access_token = create_access_token(token_data, expires_delta=expires)

    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,  # Запрещает доступ к куке через JS
        secure=True,  # Только для HTTPS (на локалке можно ставить False)
        samesite="lax",  # Защита от CSRF
        max_age=int(expires.total_seconds()),  # Указываем время жизни в секундах
    )

    return {"success": True, "message": "Вход выполнен", "user": user_record}
