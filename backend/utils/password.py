import bcrypt

# Хешируем пароль
def get_password_hash(password: str) -> str:
   # Конвертируем строку в байты, солим и хэшируем
   pwd_bytes = password.encode("utf-8")
   salt = bcrypt.gensalt()
   hashed_password = bcrypt.hashpw(pwd_bytes, salt)
   return hashed_password.decode("utf-8")

# Проверяем хешированый пароль, верификация
def verify_password(plain_password: str, hash_password: str) -> bool:
   pwd_bytes = plain_password.encode("utf-8")
   hashed_bytes = hash_password.encode("utf-8")
   return bcrypt.checkpw(pwd_bytes, hashed_bytes)