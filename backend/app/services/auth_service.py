from sqlalchemy.orm import Session
from app.core.security import create_access_token, create_refresh_token, get_subject_from_token, hash_password, verify_password
from app.crud import crud_session, crud_user
from app.models.user_session import UserSession
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.log_service import write_log

def register_user(db: Session, payload: RegisterRequest):
    existing = crud_user.get_user_by_email(db, payload.email)
    if existing:
        raise ValueError("Email already exists")
    user = crud_user.create_user(db, full_name=payload.full_name, email=payload.email, password_hash=hash_password(payload.password))
    write_log(db, action="register", user_id=user.id, target_type="user", target_id=user.id, details="User registered")
    return user

def login_user(db: Session, payload: LoginRequest):
    user = crud_user.get_user_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user.password_hash):
        raise ValueError("Invalid email or password")
    if not user.is_active:
        raise ValueError("User is inactive")
    access_token = create_access_token(str(user.id), extra={"role": user.role})
    refresh_token, expires_at = create_refresh_token(str(user.id))
    crud_session.create_session(db, UserSession(user_id=user.id, token=refresh_token, expires_at=expires_at))
    write_log(db, action="login", user_id=user.id, target_type="user", target_id=user.id, details="User logged in")
    return access_token, refresh_token, user

def refresh_access_token(db: Session, refresh_token: str):
    db_session = crud_session.get_session_by_token(db, refresh_token)
    if not db_session:
        raise ValueError("Refresh token not found")
    user_id = int(get_subject_from_token(refresh_token, expected_type="refresh"))
    user = crud_user.get_user_by_id(db, user_id)
    if not user or not user.is_active:
        raise ValueError("User not found")
    return create_access_token(str(user.id), extra={"role": user.role}), user

def logout_user(db: Session, refresh_token: str) -> None:
    crud_session.delete_session_by_token(db, refresh_token)
