from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from models.notification import Notification
from api.v1.auth import get_current_user
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

# Schemas
class NotificationSchema(BaseModel):
    id: int
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[NotificationSchema])
def get_notifications(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Récupère les notifications de l'utilisateur."""
    return db.query(Notification).filter(
        (Notification.user_id == current_user.id) | (Notification.user_id == None)
    ).order_by(Notification.created_at.desc()).all()

@router.patch("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Marque une notification comme lue."""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        (Notification.user_id == current_user.id) | (Notification.user_id == None)
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification non trouvée")
    
    notification.is_read = True
    db.commit()
    return {"message": "Notification marquée comme lue"}
