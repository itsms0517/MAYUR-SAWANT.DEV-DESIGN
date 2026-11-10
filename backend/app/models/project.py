from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    summary = Column(Text, nullable=False)
    problem = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    result = Column(Text, nullable=True)
    tech_stack = Column(String(255), nullable=True)  # Comma-separated list e.g. "React, Next.js, Tailwind"
    cover_image = Column(String(500), nullable=False)
    live_url = Column(String(500), nullable=True)
    repo_url = Column(String(500), nullable=True)
    category = Column(String(50), default="dev", index=True)  # "dev" or "design"
    featured = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
