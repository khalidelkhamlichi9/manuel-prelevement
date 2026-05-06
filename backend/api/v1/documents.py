from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from models.document import Document
from schemas.document import DocumentCreate, DocumentUpdate, DocumentResponse

router = APIRouter()


@router.get("/", response_model=List[DocumentResponse])
def get_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Récupérer la liste des documents."""
    return db.query(Document).offset(skip).limit(limit).all()


@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(document_id: int, db: Session = Depends(get_db)):
    """Récupérer un document par son ID."""
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document non trouvé")
    return doc


@router.post("/", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
def create_document(document: DocumentCreate, db: Session = Depends(get_db)):
    """Créer un nouveau document."""
    new_doc = Document(**document.model_dump())
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc


@router.put("/{document_id}", response_model=DocumentResponse)
def update_document(document_id: int, document_update: DocumentUpdate, db: Session = Depends(get_db)):
    """Mettre à jour un document."""
    db_doc = db.query(Document).filter(Document.id == document_id).first()
    if not db_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document non trouvé")
    for key, value in document_update.model_dump(exclude_unset=True).items():
        setattr(db_doc, key, value)
    db.commit()
    db.refresh(db_doc)
    return db_doc


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(document_id: int, db: Session = Depends(get_db)):
    """Supprimer un document."""
    db_doc = db.query(Document).filter(Document.id == document_id).first()
    if not db_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document non trouvé")
    db.delete(db_doc)
    db.commit()
    return None
