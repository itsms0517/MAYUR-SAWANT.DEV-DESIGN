import logging
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.security import verify_password, create_access_token
from app.db.session import get_db
from app.deps import get_current_admin
from app.models.admin_user import AdminUser
from app.models.project import Project
from app.models.message import Message
from app.models.testimonial import Testimonial
from app.schemas.admin import LoginRequest, TokenResponse, AdminUserResponse
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.schemas.message import MessageResponse
from app.schemas.testimonial import TestimonialCreate, TestimonialResponse

logger = logging.getLogger("portfolio.admin")
limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/admin", tags=["admin"])


# --- Authentication ---

@router.post("/login", response_model=TokenResponse)
@limiter.limit("5/minute")  # Prevent brute force password cracking
def admin_login(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else "unknown"
    admin = db.query(AdminUser).filter(AdminUser.email == payload.email).first()
    if not admin or not verify_password(payload.password, admin.password_hash):
        logger.warning("FAILED admin login attempt for '%s' from IP %s", payload.email, client_ip)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    logger.info("SUCCESSFUL admin login for '%s' from IP %s", payload.email, client_ip)
    token = create_access_token(subject=admin.email)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=AdminUserResponse)
def get_admin_profile(current_admin: AdminUser = Depends(get_current_admin)):
    return current_admin


# --- Projects Management ---

@router.post("/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    existing = db.query(Project).filter(Project.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="A project with this slug already exists")

    project = Project(**payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put("/projects/{id}", response_model=ProjectResponse)
def update_project(
    id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)
    return project


@router.delete("/projects/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return None


# --- Messages Management ---

@router.get("/messages", response_model=List[MessageResponse])
def get_all_messages(
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    return db.query(Message).order_by(Message.created_at.desc()).all()


@router.patch("/messages/{id}/read", response_model=MessageResponse)
def mark_message_as_read(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    msg = db.query(Message).filter(Message.id == id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    db.refresh(msg)
    return msg


# --- Testimonials Management ---

@router.post("/testimonials", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(
    payload: TestimonialCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    t = Testimonial(**payload.model_dump())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t


@router.delete("/testimonials/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    t = db.query(Testimonial).filter(Testimonial.id == id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(t)
    db.commit()
    return None
