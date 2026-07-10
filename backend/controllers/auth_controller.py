from schemas import auth_schema

async def handle_login(user_data: auth_schema.UserRegister):
   # Здесь ты работаешь с данными через user_data.email и user_data.password
   # Никаких request.json()!
   print(f"user_data: {user_data}")
   print(f"Регистрируем пользователя: {user_data.email}")
   return {"status": "User created", "email": user_data.email}