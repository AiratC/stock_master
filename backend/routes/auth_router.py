from fastapi import APIRouter, Depends
from controllers import auth_controller
from schemas import auth_schema
from db.connect_pg import get_db

router = APIRouter(
   prefix="/auth",
   tags=["Auth"]
)

# Регистрация
@router.post('/create-employee')
async def create_employee(user_data: auth_schema.CreateEmployee, db = Depends(get_db)):
   return await auth_controller.create_employee_user_controller(db, user_data)

# Вход


# Выход


# /get-me