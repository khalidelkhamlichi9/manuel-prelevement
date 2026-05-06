from pydantic import BaseModel, Field
from typing import List, Optional

class ExamenBase(BaseModel):
    nom: str
    synonymes: List[str] = Field(default_factory=list)
    codeNABM: Optional[str] = None
    code: Optional[str] = None
    code_kalisil: Optional[str] = None
    specialite: Optional[str] = None
    type: str
    laboratoireExecutant: Optional[str] = None
    revisionDate: Optional[str] = None
    
    # Récipients
    recipients: List[str] = Field(default_factory=list)

    # Facturation
    prixFixe: Optional[bool] = False
    cotation: Optional[str] = None
    prix: Optional[str] = None
    prixHN: Optional[str] = None
    
    # Analyse
    descriptionAnalyse: Optional[str] = None
    principalesIndications: Optional[str] = None

    # Pré-analytique
    nature: Optional[str] = None
    volume: Optional[str] = None
    typePrelevement: Optional[str] = None
    echantillon: Optional[str] = None
    quantiteMinimale: Optional[str] = None
    preparationPatient: Optional[str] = None
    instructionsComplementaires: Optional[str] = None
    conditions: List[str] = Field(default_factory=list)
    commentaires: List[str] = Field(default_factory=list)
    ficheRenseignements: Optional[bool] = False
    a_jeun: Optional[bool] = False
    urgent: Optional[bool] = False

    # Transport / Conservation
    temperatureTransport: Optional[str] = None

    # Analytique
    technique: Optional[str] = None
    frequence: Optional[str] = None

    # Post-analytique
    delai: Optional[str] = None
    dureeConservation: Optional[str] = None
    temperatureConservation: Optional[str] = None
    dureeStabiliteTheorique: Optional[str] = None

    # Liens
    lienExterne: Optional[str] = None


class ExamenCreate(ExamenBase):
    id: str


class ExamenUpdate(ExamenBase):
    nom: Optional[str] = None
    type: Optional[str] = None


class ExamenResponse(ExamenBase):
    id: str

    class Config:
        from_attributes = True
