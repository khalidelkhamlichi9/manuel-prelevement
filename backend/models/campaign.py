from sqlalchemy import Column, Integer, String, DateTime, JSON, Text, Enum
from sqlalchemy.sql import func
from db.database import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nom = Column(String(255), nullable=False)
    sujet = Column(String(255), nullable=True)
    contenu = Column(Text, nullable=True)
    type = Column(Enum("mailing", "sms", "notification"), nullable=False, default="mailing")
    statut = Column(Enum("brouillon", "programme", "envoye", "echec"), nullable=False, default="brouillon")
    
    # Scheduling
    date_programmee = Column(DateTime, nullable=True)
    date_envoi = Column(DateTime, nullable=True)
    
    # Stats
    total_destinataires = Column(Integer, default=0)
    total_ouvertures = Column(Integer, default=0)
    total_clics = Column(Integer, default=0)
    
    # Metadata
    filtres = Column(JSON, nullable=True)  # JSON field to store recipient filters (e.g. role='client')
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
