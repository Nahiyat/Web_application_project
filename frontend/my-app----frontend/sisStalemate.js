import { isKingInCheck } from "./isKingInCheck";

import { getPawnMoves } from "./pawnMoves";
import { getKnightMoves } from "./knightMoves";
import { getBishopMoves } from "./bishopMoves";
import { getRookMoves } from "./rookMoves";
import { getQueenMoves } from "./queenMoves";
import { getKingMoves } from "./kingMoves";

export function isStalemate(board, color) {

  // If king is in check, it cannot be stalemate
  if (isKingInCheck(board, color)) {
    return false;
  }

  // Check every piece of current player
  for (let row = 0; row < 8; row++) {

    for (let col = 0; col < 8; col++) {

      const piece = board[row][col];

      if (!piece) continue;

      const pieceColor =
        piece[0] === "w"
          ? "white"
          : "black";

      if (pieceColor !== color) continue;

      let possibleMoves = [];

      switch (piece[1]) {

        case "p":
          possibleMoves =
            getPawnMoves(board, row, col);
          break;

        case "n":
          possibleMoves =
            getKnightMoves(board, row, col);
          break;

        case "b":
          possibleMoves =
            getBishopMoves(board, row, col);
          break;

        case "r":
          possibleMoves =
            getRookMoves(board, row, col);
          break;

        case "q":
          possibleMoves =
            getQueenMoves(board, row, col);
          break;

        case "k":
          possibleMoves =
            getKingMoves(board, row, col);
          break;

        default:
          possibleMoves = [];
      }

      // Try every move
      for (const [newRow, newCol] of possibleMoves) {

        const testBoard =
          board.map(r => [...r]);

        testBoard[newRow][newCol] =
          testBoard[row][col];

        testBoard[row][col] = null;

        // If any legal move exists,
        // then it's NOT stalemate
        if (
          !isKingInCheck(
            testBoard,
            color
          )
        ) {
          return false;
        }
      }
    }
  }

  // No legal moves and king not in check
  return true;
}
