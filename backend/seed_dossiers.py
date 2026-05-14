from db.database import SessionLocal
from models.user import User
from models.examen import Examen
from models.dossier import DossierExamen
from datetime import datetime, timedelta

def seed_dossiers():
    db = SessionLocal()
    
    user = db.query(User).filter(User.identifiant == "client_test").first()
    if not user:
        print("Erreur : Utilisateur client_test non trouvé.")
        db.close()
        return
    
    # Récupérer quelques examens existants
    examens = db.query(Examen).limit(3).all()
    if not examens:
        print("Erreur : Aucun examen trouvé dans la base pour créer des dossiers.")
        db.close()
        return

    # Ajouter des dossiers
    dossiers = [
        DossierExamen(
            user_id=user.id,
            examen_id=examens[0].id,
            date_prelevement=datetime.now() - timedelta(days=2),
            statut="termine",
            commentaire="Analyse effectuée normalement.",
            resultat_pdf="/results/test1.pdf"
        ),
        DossierExamen(
            user_id=user.id,
            examen_id=examens[1].id,
            date_prelevement=datetime.now() - timedelta(hours=5),
            statut="en_cours",
            commentaire="En attente de validation technique."
        )
    ]
    
    db.add_all(dossiers)
    db.commit()
    print(f"2 dossiers de test ajoutés pour {user.identifiant}")
    db.close()

if __name__ == "__main__":
    seed_dossiers()
