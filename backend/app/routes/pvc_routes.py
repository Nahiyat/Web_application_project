from fastapi import APIRouter, HTTPException, Depends
from app.schemas.pvc_schema import PvCMoveRequest, PvCMoveResponse
from app.controllers.pvc_controller import handle_pvc_turn
# Optional: import authentication dependency if authentication is required
# from app.core.dependencies import get_current_user

router = APIRouter(prefix="/api/pvc", tags=["Player vs Computer"])

@router.post("/move", response_model=PvCMoveResponse)
async def make_pvc_move(request: PvCMoveRequest):
    result = handle_pvc_turn(request)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
        
    return result