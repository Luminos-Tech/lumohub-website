from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_current_admin
from app.crud.crud_log import list_logs
from app.db.session import get_db
from app.schemas.system_log import SystemLogRead

router = APIRouter()

@router.get("", response_model=list[SystemLogRead])
def get_logs(db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    return list_logs(db)
