export function canCastleKingside(
  board,
  color
) {

  if (color === "white") {

    return (
      board[7][4] === "wk" &&
      board[7][7] === "wr" &&
      !board[7][5] &&
      !board[7][6]
    );
  }

  return (
    board[0][4] === "bk" &&
    board[0][7] === "br" &&
    !board[0][5] &&
    !board[0][6]
  );
}
