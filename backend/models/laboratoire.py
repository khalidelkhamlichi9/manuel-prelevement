from sqlalchemy import Column, Integer, String
from db.database import Base

class Laboratoire(Base):
    __tablename__ = "laboratoires"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(200), unique=True, index=True, nullable=False)
