import chess

def try_move(fen: str, move_uci: str) -> dict:
    board = chess.Board(fen)

    try:
        # This handles e2e4 (len 4) AND e7e8q (len 5)
        move = chess.Move.from_uci(move_uci)
    except ValueError:
        return {"legal": False, "error": "Malformed move format"}

    # If the user tries to move a pawn to the last rank without a promotion char
    # python-chess will consider it illegal.
    if move not in board.legal_moves:
        # Check if the move would be legal IF it had a promotion (to give better errors)
        move.promotion = chess.QUEEN
        if move in board.legal_moves:
            return {"legal": False, "error": "Promotion piece required"}
            
        return {"legal": False, "error": "Illegal move"}

    board.push(move)

    return {
        "legal": True,
        "fen": board.fen(),
        "turn": "white" if board.turn == chess.WHITE else "black",
        "is_check": board.is_check(),
        "is_checkmate": board.is_checkmate(),
        "is_game_over": board.is_game_over(),
    }
    