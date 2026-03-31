from sqlalchemy.orm import Session
from app.crud import crud_admin, crud_user
from app.models.admin_action import AdminAction
from app.models.user import User
from app.services.log_service import write_log

def set_user_active_status(db: Session, *, admin_user_id: int, user: User, is_active: bool, note: str) -> User:
    updated = crud_user.update_user(db, user, {"is_active": is_active})
    crud_admin.create_admin_action(db, AdminAction(admin_user_id=admin_user_id, action="unlock_user" if is_active else "lock_user", target_type="user", target_id=user.id, note=note))
    write_log(db, action="admin_update_user_status", user_id=admin_user_id, target_type="user", target_id=user.id, details=note)
    return updated

def set_user_role(db: Session, *, admin_user_id: int, user: User, role: str) -> User:
    updated = crud_user.update_user(db, user, {"role": role})
    crud_admin.create_admin_action(db, AdminAction(admin_user_id=admin_user_id, action="update_role", target_type="user", target_id=user.id, note=f"Role changed to {role}"))
    write_log(db, action="admin_update_user_role", user_id=admin_user_id, target_type="user", target_id=user.id, details=f"Role changed to {role}")
    return updated
