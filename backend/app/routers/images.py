import re
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.uploaded_image import UploadedImage

router = APIRouter(prefix="/images", tags=["images"])


@router.get("/{id}")
def get_image(id: int, db: Session = Depends(get_db)):
    img = db.query(UploadedImage).filter(UploadedImage.id == id).first()
    if not img:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")

    safe_filename = re.sub(r"[^a-zA-Z0-9_.-]", "_", img.filename)[:80]

    return Response(
        content=img.data,
        media_type=img.content_type,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Disposition": f'inline; filename="{safe_filename}"',
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "Content-Security-Policy": "default-src 'none'",
        },
    )
