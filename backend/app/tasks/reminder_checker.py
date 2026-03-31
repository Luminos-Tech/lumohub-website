from app.core.database import SessionLocal
from app.core.logging import logger
from app.services.reminder_service import process_due_reminders

def run_reminder_checker() -> None:
    db = SessionLocal()
    try:
        count = process_due_reminders(db)
        if count:
            logger.info("Processed %s reminders", count)
    finally:
        db.close()
