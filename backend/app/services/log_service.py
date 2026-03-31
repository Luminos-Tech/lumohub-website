from sqlalchemy.orm import Session
from app.crud import crud_log
from app.models.system_log import SystemLog

def write_log(db: Session, *, action: str, user_id: int | None = None, target_type: str | None = None, target_id: int | None = None, details: str | None = None, ip_address: str | None = None) -> None:
    crud_log.create_log(db, SystemLog(user_id=user_id, action=action, target_type=target_type, target_id=target_id, details=details, ip_address=ip_address))
