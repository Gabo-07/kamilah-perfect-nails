from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.human import Usuario
from schemas.auth import LoginRequest, RegistroRequest, TokenResponse
from core.security import hash_password, verificar_password, crear_token

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])
@router.post("/registro", response_model=TokenResponse, status_code=201)
def registrar_usuario(datos: RegistroRequest, db: Session = Depends(get_db)):
    # Verificar si el email ya existe
    existente = db.query(Usuario).filter(Usuario.email == datos.email).first()
    if existente:
        raise HTTPException(status_code=400, detail="Ese correo ya está registrado")
    
    # Crear el nuevo usuario con contraseña encriptada
    nuevo = Usuario(
        email=datos.email,
        password_hash=hash_password(datos.password),
        rol=datos.rol
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    
    token = crear_token({"sub": nuevo.email, "rol": nuevo.rol})
    return TokenResponse(access_token=token, rol=nuevo.rol, email=nuevo.email)

@router.post("/login", response_model=TokenResponse)
def iniciar_sesion(datos:LoginRequest, db: Session = Depends(get_db)):
        # Buscar el usuario por email
        usuario = db.query(Usuario).filter(Usuario.email == datos.email).first()

        # Si no existe o la contraseña está mal, mismo error (por seguridad)
        if not usuario or not verificar_password(datos.password, usuario.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas"
            )

        token = crear_token({"sub": usuario.email, "rol": usuario.rol})
        return TokenResponse(access_token=token, rol=usuario.rol, email=usuario.email)


        