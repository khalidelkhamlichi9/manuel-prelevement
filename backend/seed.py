import logging
from db.database import SessionLocal, engine, Base
from models.examen import Examen
from models.document import Document
from models.user import User
from models.notification import Notification
from models.specialite import Specialite
from models.laboratoire import Laboratoire
from core.security import hash_password

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

USERS_MOCK = [
    {"identifiant": "CBW-ADMIN", "password": "password123", "nom": "Admin", "prenom": "CBW", "role": "laboratoire", "organisme": "Laboratoire CBW"}
]

# Spécialités adaptées
SPECIALITES_MOCK = ["BIOCHIMIE SANGUINE", "BACTÉRIOLOGIE", "HÉMATOLOGIE", "HORMONOLOGIE", "MARQUEURS CARDIAQUES", "MICROBIOLOGIE"]

# Laboratoires
LABORATOIRES_MOCK = ["CENTRE DE BIOLOGIE AL WIFAK", "CERBA", "EUROFINS BIOMNIS"]

# Liste complète (À jeun + Urgents)
EXAMENS_MOCK = [
    # --- À JEUN ---
    {"id": "A156", "nom": "CHOLESTÉROL HDL", "code": "HDL", "specialite": "BIOCHIMIE SANGUINE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": True, "urgent": False, "prix": "80 MAD"},
    {"id": "A180", "nom": "CHOLESTÉROL LDL", "code": "LDL", "specialite": "BIOCHIMIE SANGUINE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": True, "urgent": False, "prix": "80 MAD"},
    {"id": "A95", "nom": "CHOLESTEROL TOTAL", "code": "CHOL", "specialite": "BIOCHIMIE SANGUINE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": True, "urgent": False, "prix": "60 MAD"},
    {"id": "A150", "nom": "GLYCEMIE", "code": "GLY", "specialite": "BIOCHIMIE SANGUINE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["fluorure"], "a_jeun": True, "urgent": True, "prix": "50 MAD"},
    {"id": "A158", "nom": "HELICOBACTER PILORI (TEST RESPIRATOIRE)", "code": "HP", "specialite": "BACTÉRIOLOGIE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": [], "a_jeun": True, "urgent": False, "prix": "450 MAD"},
    {"id": "A354", "nom": "Triglycérides", "code": "TRI", "specialite": "BIOCHIMIE SANGUINE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": True, "urgent": False, "prix": "80 MAD"},
    
    # --- URGENTS ---
    {"id": "A97", "nom": "CK-MB", "code": "CKMB", "specialite": "MARQUEURS CARDIAQUES", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": False, "urgent": True, "prix": "150 MAD"},
    {"id": "A654", "nom": "Gazometrie arterielle", "code": "GAZ", "specialite": "BIOCHIMIE SANGUINE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["heparine"], "a_jeun": False, "urgent": True, "prix": "200 MAD"},
    {"id": "A649", "nom": "PCR MULTIPLEX RESPIRATOIRES", "code": "PCR-R", "specialite": "MICROBIOLOGIE", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["edta"], "a_jeun": False, "urgent": True, "prix": "1200 MAD"},
    {"id": "A355", "nom": "TROPONINE Ic", "code": "TROP-I", "specialite": "MARQUEURS CARDIAQUES", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": False, "urgent": True, "prix": "250 MAD"},
    {"id": "A356", "nom": "TROPONINE T US", "code": "TROP-T", "specialite": "MARQUEURS CARDIAQUES", "type": "Interne", "laboratoireExecutant": "CENTRE DE BIOLOGIE AL WIFAK", "recipients": ["sst"], "a_jeun": False, "urgent": True, "prix": "300 MAD"},
]

def seed_database():
    logger.info("Peuplement des données CBW...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for spec in SPECIALITES_MOCK:
            if not db.query(Specialite).filter(Specialite.nom == spec).first():
                db.add(Specialite(nom=spec))
        for lab in LABORATOIRES_MOCK:
            if not db.query(Laboratoire).filter(Laboratoire.nom == lab).first():
                db.add(Laboratoire(nom=lab))
        for item in EXAMENS_MOCK:
            existing = db.query(Examen).filter(Examen.id == item["id"]).first()
            if existing:
                for k, v in item.items(): setattr(existing, k, v)
            else:
                db.add(Examen(**item))
        for user in USERS_MOCK:
            if not db.query(User).filter(User.identifiant == user["identifiant"]).first():
                data = user.copy()
                data["password_hash"] = hash_password(data.pop("password"))
                db.add(User(**data))
        db.commit()
        logger.info("Succès !")
    except Exception as e:
        logger.error(f"Erreur: {e}"); db.rollback()
    finally: db.close()

if __name__ == "__main__":
    seed_database()
