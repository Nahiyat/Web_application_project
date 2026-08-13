
from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from app.core.database import get_db
from fastapi import Body
from app.core.security import verify_token, create_access_token
from app.core.dependencies import get_current_user
from app.schemas.user_schema import UserRegisterRequest, UserResponse
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.controllers import auth_controller
from app.models.user_model import User


router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED,)
def register(request: UserRegisterRequest, db: Session = Depends(get_db)):
    return auth_controller.register_user(request, db)


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    return auth_controller.login_user(request, db)

@router.post("/refresh")
def refresh_token(refresh_token: str = Body(..., embed=True)):
    payload = verify_token(refresh_token, expected_type="refresh")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": user_id})

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.auth_schema import UserInfo


@router.get("/me", response_model=UserInfo)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
    
