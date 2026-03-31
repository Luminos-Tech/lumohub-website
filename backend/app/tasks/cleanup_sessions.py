from app.core.database import SessionLocal
from app.core.logging import logger
from app.crud.crud_session import cleanup_expired_sessions

def run_cleanup_sessions() -> None:
    db = SessionLocal()
    try:
        deleted = cleanup_expired_sessions(db)
        if deleted:
            logger.info("Removed %s expired sessions", deleted)
    finally:
        db.close()
