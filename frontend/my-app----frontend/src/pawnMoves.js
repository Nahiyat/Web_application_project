export function getPawnMoves(board, row, col) {
  const moves = [];

  const piece = board[row][col];

  if (!piece) return moves;

  const isWhite = piece.startsWith("w");

  const direction = isWhite ? -1 : 1;

  const startRow = isWhite ? 6 : 1;

  const nextRow = row + direction;

  // Forward 1
  if (
    nextRow >= 0 &&
    nextRow < 8 &&
    !board[nextRow][col]
  ) {
    moves.push([nextRow, col]);

    // Forward 2 from start
    if (
      row === startRow &&
      !board[row + direction * 2][col]
    ) {
      moves.push([row + direction * 2, col]);
    }
  }

  // Capture Left
  if (
    col - 1 >= 0 &&
    board[nextRow]?.[col - 1]
  ) {
    const target = board[nextRow][col - 1];

    if (target[0] !== piece[0]) {
      moves.push([nextRow, col - 1]);
    }
  }

  // Capture Right
  if (
    col + 1 < 8 &&
    board[nextRow]?.[col + 1]
  ) {
    const target = board[nextRow][col + 1];

    if (target[0] !== piece[0]) {
      moves.push([nextRow, col + 1]);
    }
  }

  return moves;
}
