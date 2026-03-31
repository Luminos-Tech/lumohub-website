from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from app.schemas.common import ORMModel

class UserRead(ORMModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None = None
    avatar_url: str | None = None
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

class UserUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=150)
    phone: str | None = Field(default=None, max_length=20)
    avatar_url: str | None = None

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6, max_length=128)

class AdminUserRoleUpdate(BaseModel):
    role: str
