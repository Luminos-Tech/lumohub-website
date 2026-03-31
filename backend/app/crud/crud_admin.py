from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.admin_action import AdminAction

def create_admin_action(db: Session, action: AdminAction) -> AdminAction:
    db.add(action)
    db.commit()
    db.refresh(action)
    return action

def list_admin_actions(db: Session) -> list[AdminAction]:
    return list(db.scalars(select(AdminAction).order_by(AdminAction.created_at.desc())).all())
