from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user  # Your JWT Auth dependency
from app.controllers.dashboard_controller import get_player_dashboard_data
from app.schemas.dashboard_schema import PlayerDashboardResponse

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/player", response_model=PlayerDashboardResponse)
async def get_player_dashboard(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user_id = str(current_user.id)
    return get_player_dashboard_data(db, user_id)