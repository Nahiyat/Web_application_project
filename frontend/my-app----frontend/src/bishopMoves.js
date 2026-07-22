export function getBishopMoves(board, row, col) {
  const moves = [];

  const piece = board[row][col];

  if (!piece) return moves;

  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  directions.forEach(([dr, dc]) => {
    let r = row + dr;
    let c = col + dc;

    while (
      r >= 0 &&
      r < 8 &&
      c >= 0 &&
      c < 8
    ) {
      const target = board[r][c];

      if (!target) {
        moves.push([r, c]);
      } else {
        if (target[0] !== piece[0]) {
          moves.push([r, c]);
        }
        break;
      }

      r += dr;
      c += dc;
    }
  });

  return moves;
}
