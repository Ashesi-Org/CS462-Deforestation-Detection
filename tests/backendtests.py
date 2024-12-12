import requests

BASE_URL = "https://landslide-backend-7ipegonoia-uc.a.run.app/"

def test_home_endpoint():
    response = requests.get(BASE_URL)
    assert response.status_code == 503

