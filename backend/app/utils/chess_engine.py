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
"""------------------------------------------------"""
#Chess ai code

# Centipawn weights for pieces
PIECE_VALUES = {
    chess.PAWN: 100,
    chess.KNIGHT: 320,
    chess.BISHOP: 330,
    chess.ROOK: 500,
    chess.QUEEN: 900,
    chess.KING: 20000,
}

# Encourage pawns to advance toward the center and push in the endgame
PAWN_TABLE = [
     0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0
]

# Penalize knights on the rim ("Knights on the rim are dim")
KNIGHT_TABLE = [
   -50,-40,-30,-30,-30,-30,-40,-50,
   -40,-20,  0,  0,  0,  0,-20,-40,
   -30,  0, 10, 15, 15, 10,  0,-30,
   -30,  5, 15, 20, 20, 15,  5,-30,
   -30,  0, 15, 20, 20, 15,  0,-30,
   -30,  5, 10, 15, 15, 10,  5,-30,
   -40,-20,  0,  5,  5,  0,-20,-40,
   -50,-40,-30,-30,-30,-30,-40,-50
]

# Encourage bishops to occupy long diagonals and open squares
BISHOP_TABLE = [
   -20,-10,-10,-10,-10,-10,-10,-20,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5, 10, 10,  5,  0,-10,
   -10,  5,  5, 10, 10,  5,  5,-10,
   -10,  0, 10, 10, 10, 10,  0,-10,
   -10, 10, 10, 10, 10, 10, 10,-10,
   -10,  5,  0,  0,  0,  0,  5,-10,
   -20,-10,-10,-10,-10,-10,-10,-20
]

# Reward king safety in the corners during middlegame
KING_TABLE = [
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -20,-30,-30,-40,-40,-30,-30,-20,
   -10,-20,-20,-20,-20,-20,-20,-10,
    20, 20,  0,  0,  0,  0, 20, 20,
    20, 30, 10,  0,  0, 10, 30, 20
]

PST_MAP = {
    chess.PAWN: PAWN_TABLE,
    chess.KNIGHT: KNIGHT_TABLE,
    chess.BISHOP: BISHOP_TABLE,
    chess.KING: KING_TABLE,
}

def evaluate_board(board: chess.Board) -> int:
    if board.is_checkmate():
        return -20000 if board.turn == chess.WHITE else 20000
    if board.is_stalemate() or board.is_insufficient_material() or board.can_claim_draw():
        return 0

    score = 0
    for square in chess.SQUARES:
        piece = board.piece_at(square)
        if piece is not None:
            # Base piece score
            value = PIECE_VALUES[piece.piece_type]
            
            # Positional score from table
            pst = PST_MAP.get(piece.piece_type)
            pst_score = 0
            if pst:
                sq_idx = square if piece.color == chess.WHITE else chess.square_mirror(square)
                pst_score = pst[sq_idx]

            total_piece_value = value + pst_score

            if piece.color == chess.WHITE:
                score += total_piece_value
            else:
                score -= total_piece_value

    return score

def score_move(board: chess.Board, move: chess.Move) -> int:
    """Assigns a priority score to order moves before Minimax execution."""
    score = 0

    # 1. MVV-LVA for captures
    if board.is_capture(move):
        attacker = board.piece_at(move.from_square)
        victim = board.piece_at(move.to_square)
        
        # En passant handling (victim piece is None on target square)
        victim_val = PIECE_VALUES[victim.piece_type] if victim else PIECE_VALUES[chess.PAWN]
        attacker_val = PIECE_VALUES[attacker.piece_type] if attacker else PIECE_VALUES[chess.PAWN]
        
        # High value victim + low value attacker = higher priority score
        score += 10000 + (victim_val * 10) - attacker_val

    # 2. Prioritize checks
    board.push(move)
    if board.is_check():
        score += 5000
    board.pop()

    # 3. Promotions
    if move.promotion:
        score += 8000

    return score


def get_ordered_moves(board: chess.Board):
    """Returns legal moves sorted from highest to lowest priority."""
    moves = list(board.legal_moves)
    return sorted(moves, key=lambda move: score_move(board, move), reverse=True)

def minimax(board: chess.Board, depth: int, alpha: float, beta: float, maximizing_player: bool) -> float:
    if depth == 0 or board.is_game_over():
        return evaluate_board(board)

    ordered_moves = get_ordered_moves(board)

    if maximizing_player:
        max_eval = float('-inf')
        for move in ordered_moves:
            board.push(move)
            eval_score = minimax(board, depth - 1, alpha, beta, False)
            board.pop()
            max_eval = max(max_eval, eval_score)
            alpha = max(alpha, eval_score)
            if beta <= alpha:
                break  # Beta cutoff enabled much earlier by move ordering!
        return max_eval
    else:
        min_eval = float('inf')
        for move in ordered_moves:
            board.push(move)
            eval_score = minimax(board, depth - 1, alpha, beta, True)
            board.pop()
            min_eval = min(min_eval, eval_score)
            beta = min(beta, eval_score)
            if beta <= alpha:
                break  # Alpha cutoff
        return min_eval

def find_best_move(board: chess.Board, depth: int = 3) -> chess.Move:
    """
    Iterates over all legal root moves to find the move with the best evaluation.
    """
    best_move = None
    maximizing = (board.turn == chess.WHITE)
    best_value = float('-inf') if maximizing else float('inf')
    alpha = float('-inf')
    beta = float('inf')

    for move in board.legal_moves:
        board.push(move)
        board_eval = minimax(board, depth - 1, alpha, beta, not maximizing)
        board.pop()

        if maximizing:
            if board_eval > best_value:
                best_value = board_eval
                best_move = move
            alpha = max(alpha, best_value)
        else:
            if board_eval < best_value:
                best_value = board_eval
                best_move = move
            beta = min(beta, best_value)

    return best_move