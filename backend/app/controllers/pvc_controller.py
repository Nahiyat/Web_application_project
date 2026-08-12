import chess
from app.schemas.pvc_schema import PvCMoveRequest, PvCMoveResponse
from app.utils.chess_engine import try_move, find_best_move  # Uses existing engine utils

def handle_pvc_turn(payload: PvCMoveRequest) -> dict:
    """
    Executes the user's move, calculates the AI's counter-move, 
    and returns the resulting game state.
    """
    # 1. Process and validate the user's move
    user_result = try_move(payload.fen, payload.move)
    if not user_result.get("legal"):
        return {"error": user_result.get("error", "Illegal move executed.")}

    current_fen = user_result["fen"]
    
    # If the user's move ended the game, return immediately without calling the AI
    if user_result["is_game_over"]:
        return {
            "fen": current_fen,
            "user_move": payload.move,
            "bot_move": None,
            "is_game_over": True,
            "is_check": user_result.get("is_check", False),
            "winner": user_result.get("winner"),
            "reason": user_result.get("reason"),
        }

    # 2. Compute AI response move using python-chess and your Minimax search
    board = chess.Board(current_fen)
    
    # Cap difficulty level (depth) between 1 and 4 to ensure quick HTTP responses
    search_depth = max(1, min(payload.difficulty, 4))
    bot_move = find_best_move(board, depth=search_depth)

    if not bot_move:
        return {
            "fen": current_fen,
            "user_move": payload.move,
            "bot_move": None,
            "is_game_over": True,
            "is_check": board.is_check(),
            "winner": "draw",
            "reason": "no_legal_moves",
        }

    # 3. Apply the AI move to the board
    bot_move_uci = bot_move.uci()
    bot_result = try_move(current_fen, bot_move_uci)

    return {
        "fen": bot_result["fen"],
        "user_move": payload.move,
        "bot_move": bot_move_uci,
        "is_game_over": bot_result["is_game_over"],
        "is_check": bot_result.get("is_check", False),
        "winner": bot_result.get("winner"),
        "reason": bot_result.get("reason"),
    }