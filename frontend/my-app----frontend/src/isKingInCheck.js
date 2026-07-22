import { getRookMoves } from "./rookMoves";
import { getKnightMoves } from "./knightMoves";
import { getBishopMoves } from "./bishopMoves";
import { getQueenMoves } from "./queenMoves";
import { getKingMoves } from "./kingMoves";
import { getPawnMoves } from "./pawnMoves";

export function isKingInCheck(board, color) {

  let kingRow = -1;
  let kingCol = -1;

  const king = color === "white" ? "wk" : "bk";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {

      if (board[r][c] === king) {
        kingRow = r;
        kingCol = c;
      }
    }
  }

  const enemy = color === "white" ? "b" : "w";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {

      const piece = board[r][c];

      if (!piece) continue;

      if (!piece.startsWith(enemy)) continue;

      let moves = [];

      switch(piece[1]) {

        case "p":
          moves = getPawnMoves(board,r,c);
          break;

        case "n":
          moves = getKnightMoves(board,r,c);
          break;

        case "b":
          moves = getBishopMoves(board,r,c);
          break;

        case "r":
          moves = getRookMoves(board,r,c);
          break;

        case "q":
          moves = getQueenMoves(board,r,c);
          break;

        case "k":
          moves = getKingMoves(board,r,c);
          break;
      }

      if (
        moves.some(
          ([mr,mc]) =>
            mr === kingRow &&
            mc === kingCol
        )
      ) {
        return true;
      }
    }
  }

  return false;
}
