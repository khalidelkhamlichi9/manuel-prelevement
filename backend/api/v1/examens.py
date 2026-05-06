from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from db.database import get_db
from models.examen import Examen
from schemas.examen import ExamenCreate, ExamenUpdate, ExamenResponse

router = APIRouter()

@router.get("/", response_model=List[ExamenResponse])
def get_examens(
    skip: int = 0, 
    limit: int = 100, 
    search: Optional[str] = None,
    code_kalisil: Optional[str] = None,
    specialite: Optional[str] = None,
    laboratoire_executant: Optional[str] = None,
    a_jeun: Optional[bool] = None,
    urgent: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """
    Récupérer la liste des examens avec filtres.
    """
    query = db.query(Examen)
    
    if search:
        query = query.filter(
            (Examen.nom.ilike(f"%{search}%")) | 
            (Examen.code.ilike(f"%{search}%")) |
            (Examen.code_kalisil.ilike(f"%{search}%"))
        )
    
    if code_kalisil:
        query = query.filter(Examen.code_kalisil == code_kalisil)
        
    if specialite:
        query = query.filter(Examen.specialite == specialite)
        
    if laboratoire_executant:
        query = query.filter(Examen.laboratoireExecutant == laboratoire_executant)
        
    if a_jeun is not None:
        query = query.filter(Examen.a_jeun == a_jeun)
        
    if urgent is not None:
        query = query.filter(Examen.urgent == urgent)
        
    examens = query.offset(skip).limit(limit).all()
    return examens

@router.get("/{examen_id}", response_model=ExamenResponse)
def get_examen(examen_id: str, db: Session = Depends(get_db)):
    """
    Récupérer un examen par son ID.
    """
    examen = db.query(Examen).filter(Examen.id == examen_id).first()
    if not examen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Examen non trouvé")
    return examen

@router.post("/", response_model=ExamenResponse, status_code=status.HTTP_201_CREATED)
def create_examen(examen: ExamenCreate, db: Session = Depends(get_db)):
    """
    Créer un nouvel examen.
    """
    db_examen = db.query(Examen).filter(Examen.id == examen.id).first()
    if db_examen:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Un examen avec cet ID existe déjà")
    
    new_examen = Examen(**examen.model_dump())
    db.add(new_examen)
    db.commit()
    db.refresh(new_examen)
    return new_examen

@router.put("/{examen_id}", response_model=ExamenResponse)
def update_examen(examen_id: str, examen_update: ExamenUpdate, db: Session = Depends(get_db)):
    """
    Mettre à jour un examen.
    """
    db_examen = db.query(Examen).filter(Examen.id == examen_id).first()
    if not db_examen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Examen non trouvé")
    
    update_data = examen_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_examen, key, value)
        
    db.commit()
    db.refresh(db_examen)
    return db_examen

@router.delete("/{examen_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_examen(examen_id: str, db: Session = Depends(get_db)):
    """
    Supprimer un examen.
    """
    db_examen = db.query(Examen).filter(Examen.id == examen_id).first()
    if not db_examen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Examen non trouvé")
    
    db.delete(db_examen)
    db.commit()
    return None
