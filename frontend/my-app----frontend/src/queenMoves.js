import { getRookMoves } from "./rookMoves";
import { getBishopMoves } from "./bishopMoves";

export function getQueenMoves(board, row, col) {
  return [
    ...getRookMoves(board, row, col),
    ...getBishopMoves(board, row, col),
  ];
}
