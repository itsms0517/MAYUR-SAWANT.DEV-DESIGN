import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Mayur Sawant Portfolio API"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    API_V1_STR: str = "/api"

    # CORS - Locked down to authorized domains
    CORS_ORIGINS: str = (
        "https://mayurprofile.com,"
        "https://www.mayurprofile.com,"
        "https://mayur-sawant-dev-design.vercel.app,"
        "http://localhost:3000,"
        "http://127.0.0.1:3000"
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip().rstrip("/") for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"

    @property
    def sync_database_url(self) -> str:
        """Ensure standard Postgres URLs use psycopg2 or psycopg driver for SQLAlchemy."""
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    # Security & Auth
    SECRET_KEY: str = "dev-secret-key-change-in-production-min-32-chars-long"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Initial Admin Seed
    INITIAL_ADMIN_EMAIL: str = "mayursawant0517@gmail.com"
    INITIAL_ADMIN_PASSWORD: str = "Admin@Mayur2026!"

    # Email Service (Resend)
    RESEND_API_KEY: str = ""
    OWNER_EMAIL: str = "mayursawant0517@gmail.com"
    EMAIL_FROM_NAME: str = "Mayur Sawant Portfolio"
    EMAIL_FROM_ADDRESS: str = "onboarding@resend.dev"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
