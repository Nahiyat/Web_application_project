export function shouldPromote(
  piece,
  row
) {

  if (
    piece === "wp" &&
    row === 0
  ) {
    return true;
  }

  if (
    piece === "bp" &&
    row === 7
  ) {
    return true;
  }

  return false;
}
