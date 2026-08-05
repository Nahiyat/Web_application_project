from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user_schema import UserRegisterRequest, UserResponse
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.controllers import auth_controller

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED,)
def register(request: UserRegisterRequest, db: Session = Depends(get_db)):
    return auth_controller.register_user(request, db)


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    return auth_controller.login_user(request, db)

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.auth_schema import UserInfo


@router.get("/me", response_model=UserInfo)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user