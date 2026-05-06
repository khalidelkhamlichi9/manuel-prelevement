from pydantic import BaseModel
from typing import Optional


class DocumentBase(BaseModel):
    title: str
    type: str
    size: Optional[str] = None
    category: str
    date: Optional[str] = None
    file_url: Optional[str] = None


class DocumentCreate(DocumentBase):
    pass


class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    size: Optional[str] = None
    category: Optional[str] = None
    date: Optional[str] = None
    file_url: Optional[str] = None


class DocumentResponse(DocumentBase):
    id: int

    class Config:
        from_attributes = True
