from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models.laboratoire import Laboratoire
from pydantic import BaseModel

router = APIRouter()

class LaboratoireSchema(BaseModel):
    id: int
    nom: str
    class Config:
        from_attributes = True

@router.get("/", response_model=List[LaboratoireSchema])
def get_laboratoires(db: Session = Depends(get_db)):
    """Récupère la liste de tous les laboratoires exécutants."""
    return db.query(Laboratoire).order_by(Laboratoire.nom).all()

@router.post("/", response_model=LaboratoireSchema, status_code=status.HTTP_201_CREATED)
def create_laboratoire(nom: str, db: Session = Depends(get_db)):
    """Ajoute un nouveau laboratoire."""
    existing = db.query(Laboratoire).filter(Laboratoire.nom == nom).first()
    if existing:
        raise HTTPException(status_code=400, detail="Ce laboratoire existe déjà")
    
    new_lab = Laboratoire(nom=nom)
    db.add(new_lab)
    db.commit()
    db.refresh(new_lab)
    return new_lab

@router.delete("/{lab_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_laboratoire(lab_id: int, db: Session = Depends(get_db)):
    """Supprime un laboratoire."""
    lab = db.query(Laboratoire).filter(Laboratoire.id == lab_id).first()
    if not lab:
        raise HTTPException(status_code=404, detail="Laboratoire non trouvé")
    db.delete(lab)
    db.commit()
    return None
