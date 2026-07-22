from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserRegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    username: str
    rating: int
    is_guest: bool

    class Config:
        from_attributes = True