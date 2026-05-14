from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db.database import Base

class DossierExamen(Base):
    __tablename__ = "dossiers_examens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    examen_id = Column(String(50), ForeignKey("examens.id"), nullable=False)
    
    date_prelevement = Column(DateTime, server_default=func.now())
    statut = Column(Enum("en_attente", "en_cours", "termine", "annule"), nullable=False, default="en_attente")
    commentaire = Column(String(255), nullable=True)
    resultat_pdf = Column(String(255), nullable=True)
    
    # Relationships
    user = relationship("User", backref="dossiers")
    examen = relationship("Examen", backref="dossiers")
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
