from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.security import hash_password, verify_password
from app.crud.crud_user import update_user
from app.db.session import get_db
from app.schemas.user import PasswordChangeRequest, UserRead, UserUpdate
from app.services.log_service import write_log

router = APIRouter()

@router.get("/me", response_model=UserRead)
def get_me(current_user=Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserRead)
def patch_me(payload: UserUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user = update_user(db, current_user, payload.model_dump(exclude_none=True))
    write_log(db, action="update_profile", user_id=user.id, target_type="user", target_id=user.id, details="Profile updated")
    return user

@router.patch("/me/password")
def change_password(payload: PasswordChangeRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not verify_password(payload.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    update_user(db, current_user, {"password_hash": hash_password(payload.new_password)})
    write_log(db, action="change_password", user_id=current_user.id, target_type="user", target_id=current_user.id, details="Password changed")
    return {"success": True, "message": "Password changed"}
