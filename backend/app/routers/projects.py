from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.project import Project
from app.schemas.project import ProjectResponse

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=List[ProjectResponse])
def get_projects(
    category: Optional[str] = Query(None, description="Filter by category ('dev' or 'design')"),
    featured: Optional[bool] = Query(None, description="Filter featured projects"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    query = db.query(Project)
    if category:
        query = query.filter(Project.category == category)
    if featured is not None:
        query = query.filter(Project.featured == featured)
    
    projects = query.order_by(Project.created_at.desc()).offset(offset).limit(limit).all()
    return projects


@router.get("/{slug}", response_model=ProjectResponse)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project
