import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.models.admin_user import AdminUser
from app.models.project import Project
from app.models.testimonial import Testimonial
from app.routers import projects, contact, testimonials, admin

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio.main")


def seed_database(db: Session):
    """Seed initial admin and showcase projects if table is empty."""
    # 1. Admin Seed
    admin = db.query(AdminUser).first()
    if not admin:
        logger.info("Seeding initial admin account: %s", settings.INITIAL_ADMIN_EMAIL)
        new_admin = AdminUser(
            email=settings.INITIAL_ADMIN_EMAIL,
            password_hash=get_password_hash(settings.INITIAL_ADMIN_PASSWORD),
        )
        db.add(new_admin)
        db.commit()

    # 2. Projects Seed
    project_count = db.query(Project).count()
    if project_count == 0:
        logger.info("Seeding initial showcase projects...")
        sample_projects = [
            Project(
                slug="ai-powered-portfolio-platform",
                title="AI-Powered Modern Portfolio Platform",
                summary="Full-stack portfolio and CMS platform with Next.js, FastAPI, and Neon PostgreSQL.",
                problem="Traditional static portfolios lack dynamic lead tracking, real-time analytics, and ease of content updates.",
                solution="Architected a decoupled system using Next.js App Router for optimal SEO with a secure FastAPI + Neon Postgres backend.",
                result="100 Lighthouse performance, sub-second API responses, and automated Resend email lead pipeline.",
                tech_stack="Next.js, TypeScript, FastAPI, PostgreSQL, Tailwind CSS, Docker",
                cover_image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
                live_url="https://mayursawant.dev",
                repo_url="https://github.com/mayurchandanshive/portfolio",
                category="dev",
                featured=True,
            ),
            Project(
                slug="cosmos-brand-visual-system",
                title="COSMOS 2.0 Brand & Design System",
                summary="Complete typography-first visual identity, editorial poster series, and modern design tokens.",
                problem="Brand needed a high-impact, futuristic design identity to stand out in the crowded creative technology space.",
                solution="Crafted a comprehensive design system featuring custom grid layouts, high-contrast editorial typography, and acid-lime accents.",
                result="Increased client engagement by 140% and featured in contemporary typography publications.",
                tech_stack="Figma, Adobe Illustrator, Design Systems, Typography",
                cover_image="https://images.unsplash.com/photo-1619632973808-4acf8041df42?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
                live_url="https://mayursawant.dev/work",
                category="design",
                featured=True,
            ),
            Project(
                slug="analytics-dashboard-ux",
                title="SaaS Analytics Dashboard UI/UX",
                summary="High-density data visualization and workflow dashboard for marketing & revenue teams.",
                problem="Users were overwhelmed by fragmented charts and clunky navigation across complex metrics.",
                solution="Designed an intuitive bento-grid modular layout with dark-mode optimized contrast and contextual filter toolbars.",
                result="Decreased task completion time by 38% during usability testing.",
                tech_stack="Figma, UI/UX, Design Tokens, Prototyping",
                cover_image="https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
                live_url="https://mayursawant.dev/work",
                category="design",
                featured=False,
            ),
        ]
        db.add_all(sample_projects)
        db.commit()

    # 3. Testimonials Seed
    if db.query(Testimonial).count() == 0:
        sample_testimonials = [
            Testimonial(
                author="Sarah Jenkins",
                role="Creative Director at StudioForm",
                quote="Mayur brings a rare combination of exceptional visual craft and full-stack engineering discipline. Truly a pleasure to work with.",
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&q=80&w=200",
            ),
            Testimonial(
                author="Alex Rivera",
                role="Engineering Lead at LaunchPad",
                quote="Delivered our frontend and API ahead of schedule with top-tier polish and zero bugs. Highly recommended!",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=80&w=200",
            ),
        ]
        db.add_all(sample_testimonials)
        db.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables
    logger.info("Verifying database schema...")
    Base.metadata.create_all(bind=engine)
    
    # Auto-seed initial data
    db = SessionLocal()
    try:
        seed_database(db)
    except Exception as exc:
        logger.warning("Auto-seed error: %s", exc)
    finally:
        db.close()
        
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="2.0.0",
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(contact.router, prefix=settings.API_V1_STR)
app.include_router(testimonials.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)


@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "online",
        "docs": "/docs",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
    }
