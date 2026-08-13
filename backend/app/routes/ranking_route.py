

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.ranking_schema import LeaderboardResponse
from app.controllers.ranking_controller import get_leaderboard

router = APIRouter(prefix="/rankings", tags=["Rankings"])

@router.get("/leaderboard", response_model=LeaderboardResponse)
def fetch_rankings(limit: int = 100, db: Session = Depends(get_db)):
    return get_leaderboard(db=db, limit=limit)
