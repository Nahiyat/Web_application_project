from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user_model import User
from app.schemas.user_schema import UserRegisterRequest
from app.core.security import hash_password

def register_user(request: UserRegisterRequest, db: Session):
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        username=request.username,
        email=request.email,
        password_hash=hash_password(request.password),
        is_guest=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user