from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from models import User, Examen, Document  # noqa: F401 — pour que SQLAlchemy crée la table
from api.v1.auth import router as auth_router
from api.v1.examens import router as examens_router
from api.v1.documents import router as documents_router
from api.v1.notifications import router as notifications_router
from api.v1.specialites import router as specialites_router
from api.v1.laboratoires import router as laboratoires_router
import uvicorn
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Manuel de Prélèvement - CBW",
    description="API pour le manuel de prélèvement du laboratoire CBW. "
                "Gestion des examens internes (CBW) et externes (Cerba), "
                "recherche, filtrage et documents associés.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: restreindre en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentification"])
app.include_router(examens_router, prefix="/api/v1/examens", tags=["Examens"])
app.include_router(documents_router, prefix="/api/v1/documents", tags=["Documents"])
app.include_router(notifications_router, prefix="/api/v1/notifications", tags=["Notifications"])
app.include_router(specialites_router, prefix="/api/v1/specialites", tags=["Spécialités"])
app.include_router(laboratoires_router, prefix="/api/v1/laboratoires", tags=["Laboratoires"])

@app.get("/")
async def root():
    return {"message": "Manuel de Prélèvement - CBW", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
