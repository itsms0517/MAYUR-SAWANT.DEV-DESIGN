from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class MessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    project_type: str = Field(default="General Inquiry", max_length=100)
    message: str = Field(..., min_length=5, max_length=5000)


class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    project_type: str
    message: str
    created_at: datetime
    is_read: bool

    model_config = ConfigDict(from_attributes=True)
