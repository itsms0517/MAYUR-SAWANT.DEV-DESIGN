from fastapi import APIRouter, BackgroundTasks, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageResponse
from app.services.email import send_contact_email

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(
    payload: MessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # 1. Save to database
    db_message = Message(
        name=payload.name,
        email=str(payload.email),
        project_type=payload.project_type,
        message=payload.message,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # 2. Dispatch non-blocking email notification in background
    background_tasks.add_task(
        send_contact_email,
        name=payload.name,
        email=str(payload.email),
        project_type=payload.project_type,
        message=payload.message,
    )

    return db_message
