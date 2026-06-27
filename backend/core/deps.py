from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models.human import Usuario
from core.security import verificar_token

# Este es el esquema estándar para que Swagger (y React) sepan dónde iniciar sesión
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_usuario_actual(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Esta función es el 'Cadenero'. Revisa el token, lo desencripta y busca al usuario en la BD.
    """
    credenciales_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # 1. Desencriptar el token
    payload = verificar_token(token)
    if payload is None:
        raise credenciales_exception
        
    email: str = payload.get("sub")
    if email is None:
        raise credenciales_exception
        
    # 2. Buscar al usuario en la base de datos
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if usuario is None:
        raise credenciales_exception
        
    # 3. Dejarlo pasar (retorna los datos del usuario)
    return usuario