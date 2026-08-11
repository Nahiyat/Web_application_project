import datetime
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from app.core.database import SessionLocal
from app.core.security import verify_token
from app.models.game_model import Game
from app.utils.chess_engine import try_move
from app.websocket.connection_manager import manager

router = APIRouter()

def fen_turn(fen: str) -> str:
    """Helper to get turn from FEN."""
    return "white" if fen.split(" ")[1] == "w" else "black"

@router.websocket("/ws/game/{game_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str, token: str = Query(...)):
    # 1. Authenticate
    try:
        payload = verify_token(token, token_type="access")
        user_id = str(payload.get("sub"))
    except Exception:
        await websocket.close(code=1008)
        return

    db = SessionLocal()
    try:
        # Initial Fetch
        game = db.query(Game).filter(Game.id == game_id).first()
        if not game:
            await websocket.close(code=1008)
            return

        white_id = str(game.white_player_id)
        black_id = str(game.black_player_id)
        
        if user_id not in (white_id, black_id):
            await websocket.close(code=1008)
            return

        your_color = "white" if user_id == white_id else "black"
        await manager.connect(game_id, websocket)

        # Send initial authoritative state
        await websocket.send_json({
            "type": "state",
            "fen": game.fen,
            "turn": fen_turn(game.fen),
            "status": game.status,
            "your_color": your_color,
            "winner": game.winner,
        })

        while True:
            data = await websocket.receive_json()
            if data.get("type") != "move":
                continue

            move_uci = data.get("move", "")
            if not isinstance(move_uci, str) or not (4 <= len(move_uci) <= 5):
                await websocket.send_json({"type": "error", "message": "Invalid move format"})
                continue

            # SQLite Fix: Clear cache to see the OTHER player's last move
            db.expire_all()
            game = db.query(Game).filter(Game.id == game_id).first()

            if game.status == "completed":
                await websocket.send_json({"type": "error", "message": "Game is already finished"})
                continue

            # Validation
            if your_color != fen_turn(game.fen):
                await websocket.send_json({"type": "error", "message": "Not your turn"})
                continue

            # Process Move
            result = try_move(game.fen, move_uci)
            if not result["legal"]:
                await websocket.send_json({"type": "error", "message": result.get("error")})
                continue

            # Update Database
            game.fen = result["fen"]
            if result["is_game_over"]:
                game.status = "completed"
                game.winner = result["winner"] if result["winner"] else "draw"
                game.end_reason = result["reason"]
                game.completed_at = datetime.datetime.utcnow()
            
            db.commit()

            # Broadcast to both players
            payload = {
                "type": "state",
                "fen": result["fen"],
                "turn": result["turn"],
                "status": game.status,
                "last_move": move_uci,
                "is_check": result["is_check"],
                "is_game_over": result["is_game_over"],
                "winner": game.winner,
                "reason": result.get("reason")
            }
            await manager.broadcast(game_id, payload)

    except WebSocketDisconnect:
        manager.disconnect(game_id, websocket)
    except Exception as e:
        manager.disconnect(game_id, websocket)
    finally:
        db.close()