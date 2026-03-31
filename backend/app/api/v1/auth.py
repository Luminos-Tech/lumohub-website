from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.db.session import get_db
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest
from app.schemas.common import TokenResponse
from app.schemas.user import UserRead
from app.services import auth_service

router = APIRouter()

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    try:
        return auth_service.register_user(db, payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    try:
        access_token, refresh_token, _ = auth_service.login_user(db, payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return TokenResponse(access_token=access_token, refresh_token=refresh_token)

@router.post("/refresh")
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)):
    try:
        access_token, user = auth_service.refresh_access_token(db, payload.refresh_token)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return {"access_token": access_token, "token_type": "bearer", "user_id": user.id}

@router.post("/logout")
def logout(payload: RefreshRequest, db: Session = Depends(get_db)):
    auth_service.logout_user(db, payload.refresh_token)
    return {"success": True, "message": "Logged out"}

@router.get("/me", response_model=UserRead)
def me(current_user=Depends(get_current_user)):
    return current_user
