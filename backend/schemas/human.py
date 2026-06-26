from pydantic import BaseModel
from typing import Optional

# Lo que recibimos del Frontend al crear un cliente
class ClienteCreate(BaseModel):
    nombre: str
    apellido: str
    telefono: str
    email: Optional[str] = None
    instagram: Optional[str] = None
# Lo que le devolvemos al Frontend
class ClienteResponse(ClienteCreate):
    id_cliente: str
    cliente_frecuente: bool
    activo: bool
    class Config:
        from_attributes = True # Permite leer objetos de SQLAlchemy