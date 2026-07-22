export function getKnightMoves(board, row, col) {
  const moves = [];

  const piece = board[row][col];

  if (!piece) return moves;

  const directions = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  directions.forEach(([dr, dc]) => {
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 &&
      newRow < 8 &&
      newCol >= 0 &&
      newCol < 8
    ) {
      const target = board[newRow][newCol];

      if (
        !target ||
        target[0] !== piece[0]
      ) {
        moves.push([newRow, newCol]);
      }
    }
  });

  return moves;
}
