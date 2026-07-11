from db import connect_pg  # Импортируем весь модуль целиком
from utils import password


async def initAdminAccount():
   try:
      # Теперь мы каждый раз берем актуальное значение из модуля
      if connect_pg.pool is None:
         print("Ошибка: Пул еще не инициализирован!")
         return

      # Берем соединение через актуальный пул
      async with connect_pg.pool.acquire() as db:
         query = "SELECT id FROM roles WHERE name = 'admin' LIMIT 1"
         role_result = await db.fetchval(query)

         # Проверяем, есть ли уже админ
         userResult = await db.fetchrow(
            "SELECT id FROM users WHERE role_id = $1 LIMIT 1;", role_result
         )
         if userResult is not None:
            return

         defaultFirstName = "Главный Администратор"
         defaultLastName = "last_name"
         defaultEmail = "admin@admin.com"
         defaultPhone = "+79004508992"
         defaultPassword = "12345678"
         passwordHash = password.get_password_hash(defaultPassword)
         isAgree = True

         # Вставка админа
         await db.execute(
            "INSERT INTO users (first_name, last_name, email, phone, hash_password, is_agree, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7);",
            defaultFirstName,
            defaultLastName,
            defaultEmail,
            defaultPhone,
            passwordHash,
            isAgree,
            role_result,
         )

         print("==================================================")
         print("🚀 Сид базы данных: Дефолтный админ успешно создан!")
         print(f"👤 Имя: {defaultFirstName}")
         print(f"👤 Фамилия: {defaultLastName}")
         print(f"📧 Email: {defaultEmail}")
         print(f"📧 Phone: {defaultPhone}")
         print(f"🔑 Пароль: {defaultPassword}")
         print("⚠️ Не забудьте изменить эти данные в профиле CRM!")
         print("==================================================")
   except Exception as e:
      print(f"Критическая ошибка инициализации админа: {e}")
