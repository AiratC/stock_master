from sql_queries.auth_queries import create_user_and_get_data
from utils.password import get_password_hash
from sqlalchemy.ext.asyncio import AsyncSession

async def create_employee_user_controller(db: AsyncSession, user_data):
    # Подготавливаем данные
    params = {
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "email": user_data.email,
        "phone": user_data.phone,
        "hash_password": get_password_hash(user_data.password),
        "is_agree": user_data.is_agree,
        "role_id": user_data.role_id
    }
    
    # Получаем данные пользователя из репозитория
    user_data_from_db = await create_user_and_get_data(db, params)
    
    # Возвращаем строго по твоему формату
    return {
        "success": True,
        "message": "Успешная регистрация",
        "user": dict(user_data_from_db) # Конвертируем RowMapping в обычный словарь
    }