from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.user import User

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email))

def create_user(db: Session, *, full_name: str, email: str, password_hash: str, role: str = "user") -> User:
    user = User(full_name=full_name, email=email, password_hash=password_hash, role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user: User, data: dict) -> User:
    for key, value in data.items():
        setattr(user, key, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def list_users(db: Session) -> list[User]:
    return list(db.scalars(select(User).order_by(User.created_at.desc())).all())
