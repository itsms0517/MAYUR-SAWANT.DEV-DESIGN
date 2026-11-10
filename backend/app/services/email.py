import logging
import httpx
from app.core.config import settings

logger = logging.getLogger("portfolio.email")


async def send_contact_email(name: str, email: str, project_type: str, message: str) -> bool:
    """Send an email alert to the site owner via Resend (async, non-blocking)."""
    if not settings.RESEND_API_KEY or not settings.OWNER_EMAIL:
        logger.info("Resend email notification skipped (RESEND_API_KEY or OWNER_EMAIL not set)")
        return False

    email_html = f"""
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:30px; background:#0a0a0a; font-family:Arial,sans-serif; color:#ededed;">
        <div style="max-width:600px; margin:auto; background:#141414; padding:30px; border-radius:10px; border:1px solid #262626;">
            <h2 style="color:#ffffff; margin-top:0;">New Portfolio Message</h2>
            <hr style="border:0; border-top:1px solid #262626; margin:20px 0;">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Project Type:</strong> {project_type}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#1e1e1e; padding:15px; border-radius:6px; line-height:1.6; white-space:pre-wrap;">{message}</div>
            <p style="color:#737373; font-size:12px; margin-top:25px;">Sent from Mayur Sawant Portfolio</p>
        </div>
    </body>
    </html>
    """

    payload = {
        "from": f"{settings.EMAIL_FROM_NAME} <{settings.EMAIL_FROM_ADDRESS}>",
        "to": [settings.OWNER_EMAIL],
        "reply_to": [email],
        "subject": f"Portfolio Inquiry from {name} ({project_type})",
        "html": email_html,
    }

    headers = {
        "Authorization": f"Bearer {settings.RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers=headers,
                json=payload,
            )
            if response.status_code >= 400:
                logger.error("Resend API error (%s): %s", response.status_code, response.text)
                return False
            logger.info("Contact email alert delivered via Resend.")
            return True
    except Exception as exc:
        logger.exception("Failed to send contact email via Resend: %s", exc)
        return False
