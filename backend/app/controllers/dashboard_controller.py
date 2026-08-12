from pydantic import BaseModel, Field
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.game_model import Game

class PvCMoveRequest(BaseModel):
    fen: str = Field(..., description="Current state of the board in FEN notation")
    move: str = Field(..., min_length=4, max_length=5, description="Player's move in UCI format (e.g., 'e2e4')")
    difficulty: int = Field(3, ge=1, le=5, description="Difficulty / search depth for the engine (1 to 5)")

class PvCMoveResponse(BaseModel):
    fen: str = Field(..., description="Updated FEN string after engine move")
    user_move: str = Field(..., description="The user move that was executed")
    bot_move: Optional[str] = Field(None, description="The computer move in UCI format (None if game over)")
    is_game_over: bool
    is_check: bool
    winner: Optional[str] = Field(None, description="Winner color ('white', 'black', or 'draw')")
    reason: Optional[str] = Field(None, description="End reason (e.g., 'checkmate', 'stalemate')")

def get_player_dashboard_data(db: Session, user_id: str) -> dict:
    """
    Calculates game statistics and retrieves active/recent matches for a player.
    """
    # 1. Query all completed games involving this user
    user_games = db.query(Game).filter(
        or_(Game.white_player_id == user_id, Game.black_player_id == user_id)
    ).all()

    total_games = 0
    wins = 0
    losses = 0
    draws = 0
    active_games = []
    recent_games = []

    for game in user_games:
        your_color = "white" if game.white_player_id == user_id else "black"
        opponent_id = game.black_player_id if your_color == "white" else game.white_player_id

        summary = {
            "id": game.id,
            "game_mode": getattr(game, "game_mode", "pvp"),
            "status": game.status,
            "opponent_id": opponent_id,
            "your_color": your_color,
            "winner": game.winner,
            "end_reason": game.end_reason,
            "created_at": game.created_at,
        }

        if game.status == "active":
            active_games.append(summary)
        elif game.status == "completed":
            total_games += 1
            if game.winner == "draw":
                draws += 1
            elif game.winner == your_color:
                wins += 1
            else:
                losses += 1
            
            recent_games.append(summary)

    # Sort recent games by creation date (newest first)
    recent_games.sort(key=lambda x: x["created_at"], reverse=True)

    win_rate = round((wins / total_games * 100), 2) if total_games > 0 else 0.0

    return {
        "user_id": user_id,
        "total_games": total_games,
        "wins": wins,
        "losses": losses,
        "draws": draws,
        "win_rate": win_rate,
        "active_games": active_games[:5],   # Top 5 active
        "recent_games": recent_games[:10],  # Last 10 completed
    }