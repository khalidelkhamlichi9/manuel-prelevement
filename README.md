# 🧪 Manuel de Prélèvement — CBW Laboratory

> Application web full-stack de gestion du **manuel de prélèvement** du laboratoire CBW.
> Elle permet la consultation, la création et l'administration des examens biologiques (internes CBW et externes Cerba), des documents, des spécialités et des laboratoires exécutants.

---

## 📋 Table des matières

- [Aperçu du projet](#-aperçu-du-projet)
- [Stack technique](#-stack-technique)
- [Architecture du projet](#-architecture-du-projet)
- [Prérequis](#-prérequis)
- [Installation et lancement](#-installation-et-lancement)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (Next.js)](#frontend-nextjs)
- [Variables d'environnement](#-variables-denvironnement)
- [Authentification & Accès](#-authentification--accès)
- [API — Endpoints principaux](#-api--endpoints-principaux)
- [Base de données — Modèles](#-base-de-données--modèles)
- [Pages & Fonctionnalités](#-pages--fonctionnalités)
- [Structure des dossiers](#-structure-des-dossiers)

---

## 🔬 Aperçu du projet

Le **Manuel de Prélèvement CBW** est une plateforme numérique qui remplace le manuel papier du laboratoire. Elle offre :

- 🔍 **Recherche avancée** d'examens biologiques par nom, code NABM, spécialité, type ou laboratoire
- 📄 **Fiches détaillées** de chaque examen : récipients, pré-analytique, analytique, post-analytique, facturation
- 📂 **Gestion de documents** (PDF, circulaires, guides)
- 🔔 **Système de notifications**
- 👤 **Authentification sécurisée** par JWT avec gestion des rôles
- 🏥 **Deux types d'examens** : CBW (interne) et Cerba (externalisé)
- ⚡ **Filtres rapides** : À jeun, Urgent, par Spécialité, par Laboratoire

---

## 🛠️ Stack technique

### Backend
| Technologie | Version | Rôle |
|---|---|---|
| **Python** | 3.12+ | Langage principal |
| **FastAPI** | ≥ 0.104.1 | Framework API REST |
| **SQLAlchemy** | ≥ 2.0.23 | ORM |
| **MySQL** | 8.x | Base de données |
| **PyMySQL** | ≥ 1.1.0 | Driver MySQL |
| **Uvicorn** | ≥ 0.24.0 | Serveur ASGI |
| **Pydantic** | ≥ 2.9.0 | Validation des données |
| **python-jose** | ≥ 3.3.0 | JWT (JSON Web Tokens) |
| **passlib / bcrypt** | ≥ 1.7.4 / < 5.0.0 | Hashage des mots de passe |

### Frontend
| Technologie | Version | Rôle |
|---|---|---|
| **Next.js** | 14+ (App Router) | Framework React SSR/CSR |
| **React** | 18+ | UI |
| **TypeScript** | 5+ | Typage statique |
| **Vanilla CSS** | — | Styles personnalisés |
| **Context API** | — | Gestion de l'état auth |

---

## 🏗️ Architecture du projet

```
manuel prelevement/
├── backend/                     # API FastAPI
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py          # Authentification (login, /me)
│   │       ├── examens.py       # CRUD examens
│   │       ├── documents.py     # CRUD documents
│   │       ├── notifications.py # Notifications
│   │       ├── specialites.py   # Spécialités
│   │       └── laboratoires.py  # Laboratoires exécutants
│   ├── core/                    # Config, sécurité, JWT
│   ├── db/
│   │   └── database.py          # Connexion SQLAlchemy
│   ├── models/                  # Modèles SQLAlchemy (tables)
│   │   ├── user.py
│   │   ├── examen.py
│   │   ├── document.py
│   │   ├── notification.py
│   │   ├── specialite.py
│   │   └── laboratoire.py
│   ├── schemas/                 # Schémas Pydantic (validation)
│   ├── tasks/                   # Tâches background
│   ├── seed.py                  # Peuplement initial de la BDD
│   ├── requirements.txt
│   ├── main.py                  # Point d'entrée
│   └── .env                     # Variables d'environnement
│
└── frontend/                    # Application Next.js
    └── src/
        ├── app/
        │   ├── (admin)/         # Pages protégées (dashboard)
        │   │   ├── page.tsx          # Dashboard principal
        │   │   ├── examens/          # Liste + détail + nouveau
        │   │   └── documents/        # Liste + nouveau document
        │   └── (full-width-pages)/
        │       └── (auth)/
        │           └── signin/       # Page de connexion
        ├── components/
        │   ├── auth/            # SignInForm
        │   ├── dashboard/       # HeroSection, ExamensSection, NewsSlider
        │   ├── header/          # UserDropdown
        │   ├── footer/          # Footer
        │   └── ui/              # Composants réutilisables (Button, etc.)
        ├── context/
        │   └── AuthContext.tsx  # Gestion auth globale
        ├── lib/
        │   └── apiClient.ts     # Client HTTP (fetch wrapper)
        ├── constants/           # Constantes partagées (récipients, etc.)
        ├── hooks/               # Custom React hooks
        └── layout/
            └── AppSidebar.tsx   # Sidebar de navigation
```

---

## ⚙️ Prérequis

Avant de commencer, assurer que les outils suivants sont installés :

- **Node.js** ≥ 18.x et **npm** ≥ 9.x
- **Python** ≥ 3.12
- **MySQL** ≥ 8.x (via XAMPP, WampServer ou installation native)
- **Git**

---

## 🚀 Installation et lancement

### Backend (FastAPI)

```bash
# 1. Aller dans le dossier backend
cd "manuel prelevement/backend"

# 2. Créer l'environnement virtuel
python -m venv venv

# 3. Activer l'environnement virtuel
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# 4. Installer les dépendances
pip install -r requirements.txt

# 5. Configurer les variables d'environnement
# Copier et modifier le fichier .env (voir section Variables d'environnement)

# 6. Créer la base de données MySQL
# Dans MySQL, exécuter :
# CREATE DATABASE cbwmanuelprelevement CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 7. Lancer le serveur (les tables se créent automatiquement)
python main.py
# ou
uvicorn main:app --reload --port 8000
```

> Le backend sera accessible sur : **http://127.0.0.1:8000**
> Documentation interactive (Swagger) : **http://127.0.0.1:8000/docs**
> Documentation ReDoc : **http://127.0.0.1:8000/redoc**

```bash
# 8. (Optionnel) Peupler la base de données avec des données de test
python seed.py
```

---

### Frontend (Next.js)

```bash
# 1. Aller dans le dossier frontend
cd "manuel prelevement/frontend"

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
# Créer/modifier le fichier .env.local (voir section Variables d'environnement)

# 4. Lancer le serveur de développement
npm run dev
```

> Le frontend sera accessible sur : **http://localhost:3000**

---

## 🔐 Variables d'environnement

### Backend — `backend/.env`

```env
# Environnement
ENV=development

# Frontend (CORS)
FRONTEND_URL=http://localhost:3000

# Base de données MySQL
DB_USER=root
DB_PASSWORD=          # Laisser vide si pas de mot de passe (XAMPP défaut)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=cbwmanuelprelevement

# Sécurité JWT
SECRET_KEY=cbw-manuel-prelevement-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=480    # 8 heures
```

> ⚠️ **Production** : Changer obligatoirement `SECRET_KEY` par une valeur aléatoire forte, et restreindre `allow_origins` dans `main.py`.

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 🔑 Authentification & Accès

L'application utilise une authentification **JWT (Bearer Token)** stocké dans le `localStorage` du navigateur.

### Flux d'authentification

```
1. L'utilisateur saisit son identifiant + mot de passe sur /signin
2. Le frontend envoie POST /api/v1/auth/login
3. Le backend valide les credentials et retourne un access_token JWT
4. Le token est stocké dans localStorage sous la clé "access_token"
5. Chaque requête suivante inclut le header : Authorization: Bearer <token>
6. Le token expire après 480 minutes (8 heures)
```

### Rôles utilisateurs

| Rôle | Description | Accès |
|---|---|---|
| `laboratoire` | Personnel du laboratoire CBW | Accès complet : dashboard, examens, documents, création |
| `client` | Médecins / Cliniques externes | Accès en lecture aux examens et documents |

### Comptes de test (après `seed.py`)

| Identifiant | Mot de passe | Rôle | Organisme |
|---|---|---|---|
| `CBW-ADMIN` | `password123` | `laboratoire` | Laboratoire CBW |

> ℹ️ Ce compte est créé automatiquement par `seed.py`. C'est le seul compte par défaut — créer d'autres utilisateurs via l'interface admin ou directement en base.

### Endpoints d'authentification

```http
POST   /api/v1/auth/login      # Connexion → retourne access_token
GET    /api/v1/auth/me         # Récupère le profil de l'utilisateur connecté
POST   /api/v1/auth/logout     # Déconnexion (côté client : suppression du token)
```

---

## 📡 API — Endpoints principaux

Base URL : `http://127.0.0.1:8000`

### 🔒 Authentification
```http
POST   /api/v1/auth/login          # { identifiant, password } → { access_token, token_type }
GET    /api/v1/auth/me             # Profil utilisateur connecté (JWT requis)
```

### 🧫 Examens
```http
GET    /api/v1/examens             # Liste tous les examens (avec filtres)
GET    /api/v1/examens/{id}        # Détail d'un examen
POST   /api/v1/examens             # Créer un examen (JWT requis)
PUT    /api/v1/examens/{id}        # Modifier un examen (JWT requis)
DELETE /api/v1/examens/{id}        # Supprimer un examen (JWT requis)
```

**Paramètres de filtrage (GET /examens) :**
```
?search=        # Recherche texte (nom, synonymes, code)
?type=          # cbw | cerba
?specialite=    # Nom de la spécialité
?laboratoire=   # Nom du laboratoire exécutant
?a_jeun=true    # Examens nécessitant d'être à jeun
?urgent=true    # Examens en urgence
```

### 📄 Documents
```http
GET    /api/v1/documents           # Liste des documents
GET    /api/v1/documents/{id}      # Détail d'un document
POST   /api/v1/documents           # Ajouter un document (JWT requis)
DELETE /api/v1/documents/{id}      # Supprimer un document (JWT requis)
```

### 🏷️ Spécialités & Laboratoires
```http
GET    /api/v1/specialites         # Liste des spécialités
POST   /api/v1/specialites         # Créer une spécialité (JWT requis)
DELETE /api/v1/specialites/{id}    # Supprimer (JWT requis)

GET    /api/v1/laboratoires        # Liste des laboratoires exécutants
POST   /api/v1/laboratoires        # Créer un laboratoire (JWT requis)
DELETE /api/v1/laboratoires/{id}   # Supprimer (JWT requis)
```

### 🔔 Notifications
```http
GET    /api/v1/notifications       # Liste des notifications (JWT requis)
```

---

## 🗃️ Base de données — Modèles

### Table `users`

| Champ | Type | Description |
|---|---|---|
| `id` | INT (PK) | Identifiant auto-incrémenté |
| `identifiant` | VARCHAR(100) | Login unique de l'utilisateur |
| `password_hash` | VARCHAR(255) | Mot de passe hashé (bcrypt) |
| `nom` | VARCHAR(100) | Nom de famille |
| `prenom` | VARCHAR(100) | Prénom |
| `email` | VARCHAR(255) | Adresse email (optionnelle) |
| `role` | ENUM | `laboratoire` ou `client` |
| `organisme` | VARCHAR(255) | Établissement/organisme (optionnel) |
| `actif` | BOOLEAN | Compte actif ou désactivé |
| `derniere_connexion` | DATETIME | Horodatage dernière connexion |
| `created_at` | DATETIME | Date de création |
| `updated_at` | DATETIME | Date de mise à jour |

### Table `examens`

| Champ | Type | Description |
|---|---|---|
| `id` | VARCHAR(50) (PK) | Identifiant unique de l'examen |
| `nom` | VARCHAR(255) | Nom de l'examen |
| `synonymes` | JSON | Liste des noms alternatifs |
| `codeNABM` | VARCHAR(50) | Code nomenclature NABM |
| `code` | VARCHAR(50) | Code interne |
| `code_kalisil` | VARCHAR(50) | Code Kalisil (LIS) |
| `specialite` | VARCHAR(100) | Spécialité médicale |
| `type` | VARCHAR(50) | `cbw` ou `cerba` |
| `laboratoireExecutant` | VARCHAR(100) | Labo réalisant l'analyse |
| `recipients` | JSON | Liste des récipients de prélèvement |
| `prixFixe` | BOOLEAN | Prix fixe ou coté B |
| `cotation` | VARCHAR(100) | Cotation (ex: B25) |
| `prix` | VARCHAR(50) | Prix HN |
| `descriptionAnalyse` | TEXT | Description de l'analyse |
| `principalesIndications` | TEXT | Indications cliniques |
| `nature` | VARCHAR(100) | Nature du prélèvement |
| `volume` | VARCHAR(50) | Volume nécessaire |
| `preparationPatient` | TEXT | Instructions patient |
| `conditions` | JSON | Conditions pré-analytiques |
| `a_jeun` | BOOLEAN | Prélèvement à jeun requis |
| `urgent` | BOOLEAN | Réalisable en urgence |
| `temperatureTransport` | VARCHAR(100) | Condition de transport |
| `technique` | VARCHAR(100) | Technique analytique |
| `frequence` | VARCHAR(100) | Fréquence de passage |
| `delai` | VARCHAR(100) | Délai de rendu des résultats |
| `dureeConservation` | VARCHAR(100) | Durée de conservation échantillon |
| `lienExterne` | VARCHAR(255) | Lien vers fiche Cerba externe |

---

## 📱 Pages & Fonctionnalités

| Route | Page | Accès | Description |
|---|---|---|---|
| `/signin` | Connexion | Public | Formulaire de login |
| `/` | Dashboard | Connecté | Accueil : recherche, examens récents, actualités |
| `/examens` | Liste examens | Connecté | Catalogue complet avec filtres avancés |
| `/examens/[id]` | Fiche examen | Connecté | Détail complet d'un examen |
| `/examens/nouveau` | Nouvel examen | Laboratoire | Formulaire de création d'examen |
| `/documents` | Documents | Connecté | Bibliothèque de documents |
| `/documents/nouveau` | Nouveau document | Laboratoire | Ajout d'un document |
| `/profile` | Profil | Connecté | Informations du compte utilisateur |
| `*` | 404 | — | Page non trouvée |

---

## 📂 Structure des dossiers complète

```
backend/
├── api/v1/          # Routeurs FastAPI par domaine
├── core/            # Sécurité (JWT, hashing), configuration
├── db/              # Connexion base de données
├── models/          # Modèles SQLAlchemy (ORM → tables MySQL)
├── schemas/         # Schémas Pydantic (validation entrées/sorties)
├── tasks/           # Tâches asynchrones background
├── main.py          # Application FastAPI principale
├── seed.py          # Script de peuplement initial
└── requirements.txt # Dépendances Python

frontend/src/
├── app/             # Pages Next.js (App Router)
├── components/      # Composants React réutilisables
├── constants/       # Constantes partagées (récipients, labels)
├── context/         # Context API (AuthContext)
├── hooks/           # Custom hooks React
├── icons/           # Icônes SVG
├── layout/          # Layouts (Sidebar, Header)
└── lib/             # Utilitaires (apiClient)
```

---

## 🏥 À propos

Projet développé pour le **Laboratoire CBW** afin de digitaliser et centraliser le manuel de prélèvement biologique.

- **Version** : 1.0.0  
- **API** : `/health` → `{"status": "healthy"}`
