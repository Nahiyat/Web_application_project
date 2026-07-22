import "./Board.css";

import wk from "./assets/wk.png";
import wq from "./assets/wq.png";
import wr from "./assets/wr.png";
import wb from "./assets/wb.png";
import wn from "./assets/wn.png";
import wp from "./assets/wp.png";

import bk from "./assets/bk.png";
import bq from "./assets/bq.png";
import br from "./assets/br.png";
import bb from "./assets/bb.png";
import bn from "./assets/bn.png";
import bp from "./assets/bp.png";

const pieces = {
  wk,
  wq,
  wr,
  wb,
  wn,
  wp,
  bk,
  bq,
  br,
  bb,
  bn,
  bp,
};

const board = [
  ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
  ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
  ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];

export default function ChessBoard() {
  return (
    <div className="chess-container">

      <div className="wood-frame">

        <div className="chess-board">

          {board.flat().map((piece, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;

            const isLight = (row + col) % 2 === 0;

            return (
              <div
                key={index}
                className={`square ${
                  isLight ? "light-square" : "dark-square"
                }`}
              >
                {piece && (
                  <img
                    src={pieces[piece]}
                    alt={piece}
                    draggable={false}
                    className="piece"
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
