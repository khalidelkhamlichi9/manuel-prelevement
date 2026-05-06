from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone

from db.database import get_db
from models.user import User
from core.security import (
    verify_password,
    hash_password,
    create_access_token,
    get_current_user,
    require_laboratoire,
)

router = APIRouter()


# ─── Schemas ─────────────────────────────────
class LoginRequest(BaseModel):
    identifiant: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class UserCreate(BaseModel):
    identifiant: str
    password: str
    nom: str
    prenom: str
    email: Optional[str] = None
    role: str = "client"
    organisme: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    identifiant: str
    nom: str
    prenom: str
    email: Optional[str]
    role: str
    organisme: Optional[str]
    actif: bool

    class Config:
        from_attributes = True


# ─── Login ───────────────────────────────────
@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """Connexion avec identifiant + mot de passe"""
    user = db.query(User).filter(User.identifiant == data.identifiant).first()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiant ou mot de passe incorrect",
        )

    if not user.actif:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Compte désactivé. Contactez le laboratoire.",
        )

    # Mettre à jour la dernière connexion
    user.derniere_connexion = datetime.now(timezone.utc)
    db.commit()

    # Générer le token
    token = create_access_token(data={"sub": user.identifiant, "role": user.role})

    return LoginResponse(
        access_token=token,
        user={
            "id": user.id,
            "identifiant": user.identifiant,
            "nom": user.nom,
            "prenom": user.prenom,
            "role": user.role,
            "organisme": user.organisme,
        },
    )


# ─── Profil utilisateur connecté ─────────────
@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Récupérer le profil de l'utilisateur connecté"""
    return current_user


# ─── CRUD Users (laboratoire seulement) ─────
@router.get("/users", response_model=list[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_laboratoire),
):
    """Lister tous les utilisateurs (accès laboratoire)"""
    return db.query(User).all()


@router.post("/users", response_model=UserResponse, status_code=201)
def create_user(
    data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_laboratoire),
):
    """Créer un utilisateur (accès laboratoire)"""
    # Vérifier si l'identifiant existe déjà
    existing = db.query(User).filter(User.identifiant == data.identifiant).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cet identifiant existe déjà",
        )

    user = User(
        identifiant=data.identifiant,
        password_hash=hash_password(data.password),
        nom=data.nom,
        prenom=data.prenom,
        email=data.email,
        role=data.role,
        organisme=data.organisme,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_laboratoire),
):
    """Modifier un utilisateur (accès laboratoire)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    user.identifiant = data.identifiant
    user.nom = data.nom
    user.prenom = data.prenom
    user.email = data.email
    user.role = data.role
    user.organisme = data.organisme
    if data.password:
        user.password_hash = hash_password(data.password)

    db.commit()
    db.refresh(user)
    return user


@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_laboratoire),
):
    """Désactiver un utilisateur (accès laboratoire)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    user.actif = False
    db.commit()
    return {"message": f"Utilisateur {user.identifiant} désactivé"}
