from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_current_admin
from app.crud import crud_admin, crud_event, crud_log, crud_user
from app.db.session import get_db
from app.schemas.admin import AdminActionRead
from app.schemas.event import EventRead
from app.schemas.system_log import SystemLogRead
from app.schemas.user import AdminUserRoleUpdate, UserRead
from app.services.admin_service import set_user_active_status, set_user_role

router = APIRouter()

@router.get("/users", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    return crud_user.list_users(db)

@router.patch("/users/{user_id}/lock", response_model=UserRead)
def lock_user(user_id: int, db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    user = crud_user.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return set_user_active_status(db, admin_user_id=current_admin.id, user=user, is_active=False, note="Locked by admin")

@router.patch("/users/{user_id}/unlock", response_model=UserRead)
def unlock_user(user_id: int, db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    user = crud_user.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return set_user_active_status(db, admin_user_id=current_admin.id, user=user, is_active=True, note="Unlocked by admin")

@router.patch("/users/{user_id}/role", response_model=UserRead)
def change_role(user_id: int, payload: AdminUserRoleUpdate, db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    user = crud_user.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return set_user_role(db, admin_user_id=current_admin.id, user=user, role=payload.role)

@router.get("/logs", response_model=list[SystemLogRead])
def list_logs(db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    return crud_log.list_logs(db)

@router.get("/events", response_model=list[EventRead])
def list_all_events(db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    return crud_event.list_all_events(db)

@router.get("/actions", response_model=list[AdminActionRead])
def list_actions(db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    return crud_admin.list_admin_actions(db)
