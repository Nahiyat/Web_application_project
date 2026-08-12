# app/utils/chess_engine.py
import chess

def try_move(fen: str, move_uci: str) -> dict:
    board = chess.Board(fen)

    try:
        move = chess.Move.from_uci(move_uci)
    except ValueError:
        return {"legal": False, "error": "Malformed move"}

    if move not in board.legal_moves:
        # Check if it was illegal because it needed a promotion
        move.promotion = chess.QUEEN
        if move in board.legal_moves:
            return {"legal": False, "error": "Promotion piece required"}
        return {"legal": False, "error": "Illegal move"}

    board.push(move)

    # Determine why the game is over
    reason = None
    winner = None
    if board.is_checkmate():
        reason = "checkmate"
        # The winner is the person who just moved (not the side whose turn it is now)
        winner = "white" if board.turn == chess.BLACK else "black"
    elif board.is_stalemate():
        reason = "stalemate"
    elif board.is_insufficient_material():
        reason = "insufficient_material"
    elif board.is_repetition(3):
        reason = "threefold_repetition"
    elif board.is_fifty_moves():
        reason = "fifty_move_rule"

    return {
        "legal": True,
        "fen": board.fen(),
        "turn": "white" if board.turn == chess.WHITE else "black",
        "is_check": board.is_check(),
        "is_game_over": board.is_game_over(),
        "reason": reason,
        "winner": winner  # "white", "black", or None for draws
    }