from app.core.security import hash_password, verify_password

def test_password_hash_roundtrip():
    password = "Test@1234"
    password_hash = hash_password(password)
    assert verify_password(password, password_hash) is True
