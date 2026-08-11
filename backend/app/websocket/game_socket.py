from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from app.websocket.connection_manager import manager
from app.core.security import verify_token

router = APIRouter()

@router.websocket("/ws/game/{game_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    game_id: str,
    token: str = Query(...)
):
    # JWT Authentication
    try:
        payload = verify_token(token, token_type="access")
        user_id = payload.get("sub")

        if not user_id:
            await websocket.close(code=1008)
            return

    except Exception:
        await websocket.close(code=1008)
        return

    # Connect to game room
    await manager.connect(game_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()

            # Broadcast move to opponent
            await manager.broadcast(game_id, {
                "type": "move",
                "user": user_id,
                "data": data
            })

    except WebSocketDisconnect:
        manager.disconnect(game_id, websocket)