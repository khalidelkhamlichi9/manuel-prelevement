from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from db.database import get_db
from models.dossier import DossierExamen
from models.user import User
from core.security import get_current_user, require_laboratoire

router = APIRouter()

# ─── Schemas ─────────────────────────────────
class ExamenInfo(BaseModel):
    id: str
    nom: str
    type: str

class DossierResponse(BaseModel):
    id: int
    examen: ExamenInfo
    date_prelevement: datetime
    statut: str
    commentaire: Optional[str]
    resultat_pdf: Optional[str]

    class Config:
        from_attributes = True

# ─── Endpoints ───────────────────────────────

@router.get("/me", response_model=List[DossierResponse])
def get_my_dossiers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer l'historique des examens du client connecté"""
    return db.query(DossierExamen).filter(DossierExamen.user_id == current_user.id).order_by(DossierExamen.date_prelevement.desc()).all()

@router.get("/", response_model=List[DossierResponse])
def list_all_dossiers(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_laboratoire)
):
    """Lister tous les dossiers (Accès Laboratoire)"""
    return db.query(DossierExamen).all()

@router.post("/", response_model=DossierResponse)
def create_dossier(
    user_id: int,
    examen_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_laboratoire)
):
    """Attribuer un examen à un client (Accès Laboratoire)"""
    dossier = DossierExamen(user_id=user_id, examen_id=examen_id)
    db.add(dossier)
    db.commit()
    db.refresh(dossier)
    return dossier
