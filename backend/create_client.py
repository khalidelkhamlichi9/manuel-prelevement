from db.database import SessionLocal
from models.user import User
from core.security import hash_password

def create_test_client():
    db = SessionLocal()
    
    # Vérifier si l'utilisateur existe déjà
    existing = db.query(User).filter(User.identifiant == "client_test").first()
    if existing:
        print("L'utilisateur client_test existe déjà.")
        db.close()
        return

    test_client = User(
        identifiant="client_test",
        password_hash=hash_password("client123"),
        nom="TEST",
        prenom="Client",
        email="client@test.com",
        role="client",
        organisme="Laboratoire Alpha",
        actif=True
    )
    
    db.add(test_client)
    db.commit()
    print("Utilisateur client_test créé avec succès !")
    print("Identifiant : client_test")
    print("Mot de passe : client123")
    db.close()

if __name__ == "__main__":
    create_test_client()
