import asyncpg
import os

# Глобальная переменная где будет храниться пул соединений
pool = None

async def init_db():
   global pool
   pool = await asyncpg.create_pool(os.environ.get("DATABASE_URL"))
   
async def get_db():
   # Эта функция — "кран". Она берет соединение и гарантирует его возврат
   async with pool.acquire() as connection:
      yield connection
   
async def close_db():
   global pool
   if pool:
      await pool.close()