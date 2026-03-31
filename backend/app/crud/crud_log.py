from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.system_log import SystemLog

def create_log(db: Session, log: SystemLog) -> SystemLog:
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

def list_logs(db: Session) -> list[SystemLog]:
    return list(db.scalars(select(SystemLog).order_by(SystemLog.created_at.desc())).all())
