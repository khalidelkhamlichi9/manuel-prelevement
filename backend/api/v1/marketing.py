from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from db.database import get_db
from models.campaign import Campaign
from core.security import require_laboratoire

router = APIRouter()

# ─── Schemas ─────────────────────────────────
class CampaignBase(BaseModel):
    nom: str
    sujet: Optional[str] = None
    contenu: Optional[str] = None
    type: str = "mailing"
    date_programmee: Optional[datetime] = None
    filtres: Optional[dict] = None

class CampaignCreate(CampaignBase):
    pass

class CampaignResponse(CampaignBase):
    id: int
    statut: str
    date_envoi: Optional[datetime]
    total_destinataires: int
    total_ouvertures: int
    total_clics: int
    created_at: datetime

    class Config:
        from_attributes = True

# ─── Endpoints ───────────────────────────────

@router.get("/", response_model=List[CampaignResponse])
def list_campaigns(
    db: Session = Depends(get_db),
    current_user = Depends(require_laboratoire)
):
    """Lister toutes les campagnes marketing"""
    return db.query(Campaign).order_by(Campaign.created_at.desc()).all()

@router.post("/", response_model=CampaignResponse, status_code=201)
def create_campaign(
    data: CampaignCreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_laboratoire)
):
    """Créer une nouvelle campagne"""
    campaign = Campaign(
        nom=data.nom,
        sujet=data.sujet,
        contenu=data.contenu,
        type=data.type,
        date_programmee=data.date_programmee,
        filtres=data.filtres,
        statut="brouillon"
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign

@router.get("/{campaign_id}", response_model=CampaignResponse)
def get_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_laboratoire)
):
    """Détails d'une campagne"""
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campagne introuvable")
    return campaign

@router.delete("/{campaign_id}")
def delete_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_laboratoire)
):
    """Supprimer une campagne"""
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campagne introuvable")
    
    db.delete(campaign)
    db.commit()
    return {"message": "Campagne supprimée avec succès"}
