from datetime import datetime, timedelta, timezone
import jwt
from dotenv import load_dotenv
import os

load_dotenv()

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
   to_encode = data.copy()
   secret = os.environ.get("SECRET_KEY")
   if not secret:
      raise RuntimeError("SECRET_KEY не задан в .env файле!")
   # Если expires_delta не передан, ставим дефолт (например, 1 час)
   if expires_delta:
      expire = datetime.now(timezone.utc) + expires_delta
   else:
      expire = datetime.now(timezone.utc) + timedelta(hours=1)

   to_encode.update({"exp": expire})
   return jwt.encode(to_encode, secret, algorithm=os.environ.get("ALGORITHM"))
