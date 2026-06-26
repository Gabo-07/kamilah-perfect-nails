from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models.human import Cliente, Usuario, Empleado
from routers import clients

# Aquí inicializamos FastAPI
app = FastAPI(
    title="Kamilah Perfect Nails API",
    description="API para el sistema de gestión del salón",
    version="1.0.0"
)

# Damos permiso a React de consumir esta API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción se pone la URL de Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Esta línea CREA las tablas en la base de datos mágicamente 
# (si no existen) al arrancar el servidor
Base.metadata.create_all(bind=engine)

app.include_router(clients.router)

@app.get("/")
def read_root():
        return {"mensaje": "¡Bienvenida a la API de Kamilah Perfect Nails!"}
        