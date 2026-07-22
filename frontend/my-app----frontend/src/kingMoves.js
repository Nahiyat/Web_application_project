export function getKingMoves(board, row, col) {
  const moves = [];

  const piece = board[row][col];

  if (!piece) return moves;

  const directions = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1],
  ];

  directions.forEach(([dr,dc]) => {
    const r = row + dr;
    const c = col + dc;

    if (
      r >= 0 &&
      r < 8 &&
      c >= 0 &&
      c < 8
    ) {
      const target = board[r][c];

      if (
        !target ||
        target[0] !== piece[0]
      ) {
        moves.push([r,c]);
      }
    }
  });

  return moves;
}
