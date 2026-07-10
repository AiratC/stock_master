from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager
from db import connect_pg

# Импортируем роутеры
from routes import auth_router
print(auth_router)

# Загружаем переменные из .env
load_dotenv()

"""
@asynccontextmanager
Это декоратор из стандартной библиотеки Python, который превращает функцию в менеджер контекста.
"""
@asynccontextmanager
async def lifespan(app: FastAPI):
   await connect_pg.init_db()
   print("База данных успешно подключена (Пул создан)")
   
   yield
   await connect_pg.close_db()
   print("Подключение к базе данных закрыто")

app = FastAPI(lifespan=lifespan)

# Настройка CORS, CORS (Cross-Origin Resource Sharing) — это механизм безопасности браузеров. (что бы фронтенд мог достучаться)
"""
Браузер запрещает сайту frontend.com делать запросы к API на backend.com, если бэкенд явно не разрешил это.
"""
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
print(frontend_url)

origins = [
   frontend_url
]

app.add_middleware(
   CORSMiddleware,
   # allow_origins: Указывает, кому можно доверять.
   allow_origins=origins, # Передаем массив вместо одной строки
   # allow_credentials=True: Позволяет отправлять куки и заголовки авторизации.
   allow_credentials=True,
   # allow_methods=["*"]: Разрешает любые методы (GET, POST, PUT, DELETE).
   allow_methods=["*"], 
   allow_headers=["*"], 
)

# Роутеры
app.include_router(auth_router, prefix="/api")