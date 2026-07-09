# Здесь мы опишем, как должен выглядеть объект регистрации
from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
   # EmailStr автоматически проверит, что это валидный email
   email: EmailStr
   # Field позволяет задать правила (например, минимум 8 символов)
   password: str = Field(..., min_length=8)
   
   # Имя и фамилия: минимум 2 символа
   first_name: str = Field(..., min_length=2, max_length=20)
   last_name: str = Field(..., min_length=2, max_length=50)
   
   # Телефон: можно задать regex-паттерн, если нужно строгое соответствие
   phone: str = Field(..., min_length=10, max_length=15)
   
   # Согласие: обязательно True
   is_agree: bool = Field(..., eq=True)