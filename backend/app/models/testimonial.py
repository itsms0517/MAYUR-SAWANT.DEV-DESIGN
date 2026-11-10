from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.db.base import Base


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)  # e.g. "Founder, TechCorp"
    quote = Column(Text, nullable=False)
    avatar = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
