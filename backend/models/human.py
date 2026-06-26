import uuid
from sqlalchemy import Column, String, Boolean, text
# Importamos la "Base" que creamos en database.py
from database import Base

class Cliente(Base):
    __tablename__ = "clientes"

    # UUID es un ID seguro, ej: "550e8400-e29b-41d4-a716-446655440000"
    id_cliente = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    
    # El teléfono es único, no pueden haber dos clientes con el mismo
    telefono = Column(String(20), unique=True, nullable=False)
    email = Column(String(100), nullable=True)
    instagram = Column(String(100), nullable=True)
    
    # Ficha médica y preferencias
    notas_medicas = Column(String(500), nullable=True)
    como_nos_conocio = Column(String(50), nullable=True)
    
    # Para saber si la cliente es habitual
    cliente_frecuente = Column(Boolean, default=False)
    activo = Column(Boolean, default=True)

class Usuario(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    rol = Column(String(50), default="recepcionista") # roles: admin, recepcionista
    activo = Column(Boolean, default=True)
class Empleado(Base):
    __tablename__ = "empleados"
    id_empleado = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    # id_usuario será opcional, lo relacionaremos más adelante
    id_usuario = Column(String(36), nullable=True) 
    
    nombre = Column(String(100), nullable=False)
    especialidad = Column(String(100), nullable=False) # ej: "Acrílicas y Nail Art"
    activo = Column(Boolean, default=True)