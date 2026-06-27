from pydantic import BaseModel

class RegistroRequest(BaseModel):
    email: str
    password: str
    rol: str = "recepcionista" # Por defecto es recepcionista

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    rol: str
    email: str