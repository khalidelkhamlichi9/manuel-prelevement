from sqlalchemy import Column, Integer, String
from db.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(500), nullable=False, index=True)
    type = Column(String(20), nullable=False)  # pdf, word, image
    size = Column(String(20), nullable=True)
    category = Column(String(100), nullable=False)
    date = Column(String(20), nullable=True)
    file_url = Column(String(500), nullable=True)  # Pour les vrais fichiers uploadés
