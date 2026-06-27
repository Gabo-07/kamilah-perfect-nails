from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import bcrypt
import jwt
import os

# Carga las variables del archivo .env automáticamente
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))

def verificar_password(password_plano: str, password_hash: str) -> bool:
    """Compara la contraseña escrita con el hash guardado en la BD"""
    return bcrypt.checkpw(
        password_plano.encode("utf-8"),
        password_hash.encode("utf-8")
    )
def hash_password(password: str) -> str:
    """Convierte una contraseña legible en un hash irreversible"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def crear_token(data: dict) -> str:
    """Crea el Token JWT que le damos al usuario al iniciar sesión"""
    datos = data.copy()
    expira = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    datos.update({"exp": expira})
    return jwt.encode(datos, SECRET_KEY, algorithm=ALGORITHM)
    
def verificar_token(token: str) -> dict | None:
    """Verifica si un token es válido y no ha expirado"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None