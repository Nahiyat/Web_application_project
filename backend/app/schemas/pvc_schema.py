from pydantic import BaseModel, Field
from typing import Optional

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