export function canEnPassant(
  lastMove,
  pawnRow,
  pawnCol
) {

  if (!lastMove) return false;

  return (
    Math.abs(
      lastMove.fromRow -
      lastMove.toRow
    ) === 2
  );
}
