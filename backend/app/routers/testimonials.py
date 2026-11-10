from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialResponse

router = APIRouter(prefix="/testimonials", tags=["testimonials"])


@router.get("", response_model=List[TestimonialResponse])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()
