from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.controllers.matchmaking_controller import find_match
from app.models.user_model import User

router = APIRouter(prefix="/match", tags=["Matchmaking"])

@router.post("/find")
def find_game(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return find_match(current_user, db)