from fastapi import APIRouter
from controllers import auth_controller
from schemas import auth_schema

router = APIRouter(
   prefix="/auth",
   tags=["Auth"]
)

# Регистрация
@router.post('/register')
async def register(user_data: auth_schema.UserRegister):
   return await auth_controller.handle_login(user_data)

# Вход


# Выход


# /get-me