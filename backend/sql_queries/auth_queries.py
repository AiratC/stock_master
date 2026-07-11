from sqlalchemy import text

async def create_user_and_get_data(db, data: dict):
    # 1. Вставка (Используем $1, $2... — это синтаксис asyncpg)
    insert_query = """
        INSERT INTO users (first_name, last_name, email, phone, hash_password, is_agree, role_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id;
    """
    
    # fetchval возвращает ровно одно значение (ID)
    user_id = await db.fetchval(
        insert_query, 
        data['first_name'], data['last_name'], data['email'], 
        data['phone'], data['hash_password'], data['is_agree'], data['role_id']
    )

    # 2. Получение данных (Здесь используем $1 для user_id)
    select_query = """
        SELECT u.id, u.first_name, u.last_name, u.email, u.phone, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.id = $1
    """
    
    # fetchrow возвращает целую строку (а не одно значение)
    user_row = await db.fetchrow(select_query, user_id)
    
    # Если вдруг запись не нашлась, это ошибка системы
    if not user_row:
        raise ValueError("Ошибка при создании пользователя: запись не найдена")
    
    # Превращаем в словарь (asyncpg позволяет это делать через dict())
    return dict(user_row)