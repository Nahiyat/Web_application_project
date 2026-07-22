import { isKingInCheck } from "./isKingInCheck";

import { getPawnMoves } from "./pawnMoves";
import { getKnightMoves } from "./knightMoves";
import { getBishopMoves } from "./bishopMoves";
import { getRookMoves } from "./rookMoves";
import { getQueenMoves } from "./queenMoves";
import { getKingMoves } from "./kingMoves";

export function isCheckmate(board, color) {

  if (!isKingInCheck(board, color)) {
    return false;
  }

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

      for (const [newRow, newCol] of possibleMoves) {

        const testBoard =
          board.map(r => [...r]);

        testBoard[newRow][newCol] =
          testBoard[row][col];

        testBoard[row][col] = null;

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

  return true;
}
