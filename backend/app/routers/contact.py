import html
from fastapi import APIRouter, BackgroundTasks, Depends, Request, status
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.db.session import get_db
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageResponse
from app.services.email import send_contact_email

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")  # Prevent bot flooding and spam
def submit_contact(
    request: Request,
    payload: MessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Sanitize inputs to prevent Stored XSS
    clean_name = html.escape(payload.name.strip())
    clean_project_type = html.escape(payload.project_type.strip())
    clean_message = html.escape(payload.message.strip())

    # 1. Save sanitized data to database (parameterized via SQLAlchemy)
    db_message = Message(
        name=clean_name,
        email=str(payload.email).strip().lower(),
        project_type=clean_project_type,
        message=clean_message,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # 2. Dispatch non-blocking email notification in background
    background_tasks.add_task(
        send_contact_email,
        name=clean_name,
        email=str(payload.email),
        project_type=clean_project_type,
        message=clean_message,
    )

    return db_message
