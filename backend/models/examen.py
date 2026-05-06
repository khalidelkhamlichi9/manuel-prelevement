from sqlalchemy import Column, String, Boolean, JSON, Text
from db.database import Base

class Examen(Base):
    __tablename__ = "examens"

    id = Column(String(50), primary_key=True, index=True)
    nom = Column(String(255), index=True, nullable=False)
    synonymes = Column(JSON, default=list)
    codeNABM = Column(String(50), nullable=True)
    code = Column(String(50), index=True, nullable=True)
    code_kalisil = Column(String(50), index=True, nullable=True)
    specialite = Column(String(100), nullable=True)
    type = Column(String(50), nullable=False)
    laboratoireExecutant = Column(String(100), nullable=True)
    revisionDate = Column(String(50), nullable=True)

    # Récipients
    recipients = Column(JSON, default=list)

    # Facturation
    prixFixe = Column(Boolean, default=False)
    cotation = Column(String(100), nullable=True)
    prix = Column(String(50), nullable=True)
    prixHN = Column(String(50), nullable=True)

    # Analyse
    descriptionAnalyse = Column(Text, nullable=True)
    principalesIndications = Column(Text, nullable=True)

    # Pré-analytique
    nature = Column(String(100), nullable=True)
    volume = Column(String(50), nullable=True)
    typePrelevement = Column(String(100), nullable=True)
    echantillon = Column(String(100), nullable=True)
    quantiteMinimale = Column(String(100), nullable=True)
    preparationPatient = Column(Text, nullable=True)
    instructionsComplementaires = Column(Text, nullable=True)
    conditions = Column(JSON, default=list)
    commentaires = Column(JSON, default=list)
    ficheRenseignements = Column(Boolean, default=False)
    a_jeun = Column(Boolean, default=False)
    urgent = Column(Boolean, default=False)

    # Transport / Conservation
    temperatureTransport = Column(String(100), nullable=True)

    # Analytique
    technique = Column(String(100), nullable=True)
    frequence = Column(String(100), nullable=True)

    # Post-analytique
    delai = Column(String(100), nullable=True)
    dureeConservation = Column(String(100), nullable=True)
    temperatureConservation = Column(String(100), nullable=True)
    dureeStabiliteTheorique = Column(String(100), nullable=True)

    # Liens
    lienExterne = Column(String(255), nullable=True)
