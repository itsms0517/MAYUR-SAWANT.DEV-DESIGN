from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "service" in response.json()


def test_health_combined():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "healthy"


def test_health_liveness():
    response = client.get("/api/health/live")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "live"


def test_health_readiness():
    response = client.get("/api/health/ready")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert data["database"] == "connected"


def test_get_projects():
    response = client.get("/api/projects")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_testimonials():
    response = client.get("/api/testimonials")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_contact_validation():
    # Invalid email format should return 422
    response = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "email": "invalid-email",
            "message": "This is a test message",
        },
    )
    assert response.status_code == 422


def test_image_upload_and_retrieval():
    from io import BytesIO

    # 1. Login as admin
    login_res = client.post(
        "/api/admin/login",
        json={"email": "mayursawant0517@gmail.com", "password": "Admin@Mayur2026!"},
    )
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]

    # 2. Upload sample image
    image_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4"
    files = {"file": ("test.png", BytesIO(image_bytes), "image/png")}
    upload_res = client.post(
        "/api/admin/upload",
        files=files,
        headers={"Authorization": f"Bearer {token}"},
    )
    assert upload_res.status_code == 200
    data = upload_res.json()
    assert "url" in data
    assert "id" in data
    image_id = data["id"]

    # 3. Retrieve uploaded image publicly
    get_res = client.get(f"/api/images/{image_id}")
    assert get_res.status_code == 200
    assert get_res.headers["content-type"] == "image/png"
    assert get_res.headers["x-content-type-options"] == "nosniff"
    assert get_res.content == image_bytes

    # 4. Reject SVG / non-raster image (blocks Stored SVG XSS)
    svg_bytes = b"<svg onload=alert(1)>"
    bad_upload = client.post(
        "/api/admin/upload",
        files={"file": ("malicious.svg", BytesIO(svg_bytes), "image/svg+xml")},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert bad_upload.status_code == 400

    # 5. Reject spoofed image with invalid magic bytes
    fake_png = client.post(
        "/api/admin/upload",
        files={"file": ("fake.png", BytesIO(b"not a real png header"), "image/png")},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert fake_png.status_code == 400

