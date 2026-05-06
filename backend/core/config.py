from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Configuration pour le Manuel de Prélèvement CBW"""

    # Environment
    ENV: str = "development"

    # Frontend
    FRONTEND_URL: str = "http://localhost:3000"

    # Database
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_HOST: str = "127.0.0.1"
    DB_PORT: int = 3306
    DB_NAME: str = "cbwmanuelprelevement"

    # JWT
    SECRET_KEY: str = "cbw-manuel-prelevement-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480  # 8 heures

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
