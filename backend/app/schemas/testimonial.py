from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class TestimonialCreate(BaseModel):
    author: str
    role: str
    quote: str
    avatar: Optional[str] = None


class TestimonialResponse(TestimonialCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
