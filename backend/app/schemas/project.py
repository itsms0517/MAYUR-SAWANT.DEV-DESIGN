from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    slug: str
    title: str
    summary: str
    problem: Optional[str] = None
    solution: Optional[str] = None
    result: Optional[str] = None
    tech_stack: Optional[str] = None
    cover_image: str
    live_url: Optional[str] = None
    repo_url: Optional[str] = None
    category: Optional[str] = "dev"
    featured: Optional[bool] = False


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    result: Optional[str] = None
    tech_stack: Optional[str] = None
    cover_image: Optional[str] = None
    live_url: Optional[str] = None
    repo_url: Optional[str] = None
    category: Optional[str] = None
    featured: Optional[bool] = None


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
