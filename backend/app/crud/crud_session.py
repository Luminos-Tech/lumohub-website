from datetime import datetime, timezone
from sqlalchemy import delete, select
from sqlalchemy.orm import Session
from app.models.user_session import UserSession

def create_session(db: Session, session: UserSession) -> UserSession:
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_session_by_token(db: Session, token: str) -> UserSession | None:
    return db.scalar(select(UserSession).where(UserSession.token == token))

def delete_session_by_token(db: Session, token: str) -> None:
    db.execute(delete(UserSession).where(UserSession.token == token))
    db.commit()

def cleanup_expired_sessions(db: Session) -> int:
    count = len(list(db.scalars(select(UserSession).where(UserSession.expires_at <= datetime.now(timezone.utc))).all()))
    db.execute(delete(UserSession).where(UserSession.expires_at <= datetime.now(timezone.utc)))
    db.commit()
    return count
