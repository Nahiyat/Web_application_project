from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from app.core.database import SessionLocal
from app.core.security import verify_token
from app.models.game_model import Game
from app.utils.chess_engine import try_move
from app.websocket.connection_manager import manager

router = APIRouter()

def fen_turn(fen: str) -> str:
    return "white" if fen.split(" ")[1] == "w" else "black"

@router.websocket("/ws/game/{game_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    game_id: str,
    token: str = Query(...),
):
    # 1. Auth
    try:
        payload = verify_token(token, token_type="access")
        user_id = str(payload.get("sub"))
    except Exception:
        await websocket.close(code=1008)
        return

    db = SessionLocal()

    try:
        # 2. Initial Fetch
        game = db.query(Game).filter(Game.id == game_id).first()
        if not game:
            await websocket.close(code=1008)
            return

        white_id = str(game.white_player_id)
        black_id = str(game.black_player_id)
        your_color = "white" if user_id == white_id else "black"

        await manager.connect(game_id, websocket)

        # Send initial state
        await websocket.send_json({
            "type": "state",
            "fen": game.fen,
            "turn": fen_turn(game.fen),
            "status": game.status,
            "your_color": your_color,
        })

        while True:
            data = await websocket.receive_json()
            
            # 1. Check type first
            if data.get("type") != "move":
                continue

            # 2. Extract and Validate string length
            # Normal move = 4 chars (e2e4)
            # Promotion move = 5 chars (e7e8q)
            move_uci = data.get("move", "")
            if not isinstance(move_uci, str) or not (4 <= len(move_uci) <= 5):
                await websocket.send_json({"type": "error", "message": "Invalid move format"})
                continue

            # --- CRITICAL FOR SQLITE ---
            db.expire_all() 
            
            game = db.query(Game).filter(Game.id == game_id).first()

            if not game:
                break

            if game.status == "completed":
                await websocket.send_json({"type": "error", "message": "Game over"})
                continue

            # 3. Turn check
            if your_color != fen_turn(game.fen):
                await websocket.send_json({"type": "error", "message": "Not your turn"})
                continue

            # 4. Move logic (try_move will handle the 'q' at the end of e7e8q automatically)
            result = try_move(game.fen, move_uci)
            if not result["legal"]:
                await websocket.send_json({
                    "type": "error", 
                    "message": result.get("error", "Illegal move")
                })
                continue

            # 5. Update DB
            game.fen = result["fen"]
            if result["is_game_over"]:
                game.status = "completed"
            
            db.commit() 

            # 3. Broadcast to EVERYONE in this game
            await manager.broadcast(game_id, {
                "type": "state",
                "fen": result["fen"],
                "turn": fen_turn(result["fen"]),
                "status": game.status,
                "is_checkmate": result.get("is_checkmate", False),
                "is_check": result.get("is_check", False),
            })

    except WebSocketDisconnect:
        manager.disconnect(game_id, websocket)
    except Exception as e:
        print(f"WS Error: {e}")
        manager.disconnect(game_id, websocket)
    finally:
        db.close()