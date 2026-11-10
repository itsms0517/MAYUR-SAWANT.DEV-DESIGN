from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "service" in response.json()


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
