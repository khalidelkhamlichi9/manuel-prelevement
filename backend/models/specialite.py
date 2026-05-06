from sqlalchemy import Column, Integer, String
from db.database import Base

class Specialite(Base):
    __tablename__ = "specialites"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), unique=True, index=True, nullable=False)
