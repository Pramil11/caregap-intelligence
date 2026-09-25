from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus


DB_USER = "postgres"
DB_PASSWORD = "Nepal@826333"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "caregap_db"


encoded_password = quote_plus(DB_PASSWORD)


DATABASE_URL = (
    f"postgresql://{DB_USER}:{encoded_password}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


engine = create_engine(
    DATABASE_URL
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)