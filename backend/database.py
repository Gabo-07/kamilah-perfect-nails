from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Usaremos SQLite para pruebas locales. 
# El archivo de la BD se llamará 'kamilah.db' y se creará automáticamente.
SQLALCHEMY_DATABASE_URL = "sqlite:///./kamilah.db"

# connect_args solo es necesario para SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Todos nuestros modelos heredarán de esta clase Base
Base = declarative_base()

# Dependencia para que FastAPI use la base de datos en cada petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()