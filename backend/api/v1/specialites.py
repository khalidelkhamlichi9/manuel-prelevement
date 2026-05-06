from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models.specialite import Specialite
from pydantic import BaseModel

router = APIRouter()

class SpecialiteSchema(BaseModel):
    id: int
    nom: str
    class Config:
        from_attributes = True

@router.get("/", response_model=List[SpecialiteSchema])
def get_specialites(db: Session = Depends(get_db)):
    """Récupère la liste de toutes les spécialités."""
    return db.query(Specialite).order_by(Specialite.nom).all()

@router.post("/", response_model=SpecialiteSchema, status_code=status.HTTP_201_CREATED)
def create_specialite(nom: str, db: Session = Depends(get_db)):
    """Ajoute une nouvelle spécialité."""
    existing = db.query(Specialite).filter(Specialite.nom == nom).first()
    if existing:
        raise HTTPException(status_code=400, detail="Cette spécialité existe déjà")
    
    new_spec = Specialite(nom=nom)
    db.add(new_spec)
    db.commit()
    db.refresh(new_spec)
    return new_spec

@router.delete("/{spec_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_specialite(spec_id: int, db: Session = Depends(get_db)):
    """Supprime une spécialité."""
    spec = db.query(Specialite).filter(Specialite.id == spec_id).first()
    if not spec:
        raise HTTPException(status_code=404, detail="Spécialité non trouvée")
    db.delete(spec)
    db.commit()
    return None
