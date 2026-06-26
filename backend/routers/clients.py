from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.human import Cliente
from schemas.human import ClienteCreate, ClienteResponse

router = APIRouter(prefix="/api/clientes", tags=["Clientes"])

@router.post("/", response_model=ClienteResponse)
def crear_cliente(cliente: ClienteCreate, db: Session = Depends(get_db)):
    # Convertimos los datos del schema al modelo de BD
    nuevo_cliente = Cliente(**cliente.dict())
    db.add(nuevo_cliente)
    db.commit()
    db.refresh(nuevo_cliente)
    return nuevo_cliente

@router.get("/", response_model=list[ClienteResponse])
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all()