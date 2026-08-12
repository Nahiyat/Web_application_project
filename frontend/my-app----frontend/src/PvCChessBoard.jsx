import { useState } from "react";
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

const pieces = { wk, wq, wr, wb, wn, wp, bk, bq, br, bb, bn, bp };

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// FEN -> 8x8 array. Row 0 = rank 8 (black side)
function fenToBoard(fen) {
  const placement = fen.split(" ")[0];
  return placement.split("/").map((rowStr) => {
    const row = [];
    for (const char of rowStr) {
      if (/\d/.test(char)) {
        row.push(...Array(parseInt(char, 10)).fill(null));
      } else {
        const color = char === char.toUpperCase() ? "w" : "b";
        row.push(`${color}${char.toLowerCase()}`);
      }
    }
    return row;
  });
}

// {row, col} -> "e4"
function rowColToSquare(row, col) {
  const file = String.fromCharCode("a".charCodeAt(0) + col);
  const rank = 8 - row;
  return `${file}${rank}`;
}

export default function PvCChessBoard() {
  const [fen, setFen] = useState(STARTING_FEN);
  const [board, setBoard] = useState(fenToBoard(STARTING_FEN));
  const [yourColor] = useState("white"); // Human plays White
  const [turn, setTurn] = useState("white");
  const [selected, setSelected] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [awaitingEngine, setAwaitingEngine] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [pendingPromotion, setPendingPromotion] = useState(null);

  const sendMoveToEngine = async (from, to, promotion = "") => {
    const moveUCI = `${from}${to}${promotion}`;
    setAwaitingEngine(true);
    setPendingPromotion(null);
    setStatusMessage("Computer is thinking...");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/pvc/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          fen: fen,
          move: moveUCI,
          difficulty: difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.detail || "Invalid move");
        setAwaitingEngine(false);
        return;
      }

      // Update local state with returned FEN
      setFen(data.fen);
      setBoard(fenToBoard(data.fen));

      // Derive turn from updated FEN
      const nextTurn = data.fen.split(" ")[1] === "w" ? "white" : "black";
      setTurn(nextTurn);

      // Handle Game Over / Check states
      if (data.is_game_over) {
        const winnerText =
          data.winner === "draw"
            ? "Game is a Draw!"
            : `${data.winner.toUpperCase()} wins!`;
        const reasonText = data.reason
          ? `(${data.reason.replace(/_/g, " ")})`
          : "";
        setStatusMessage(`${winnerText} ${reasonText}`);
      } else if (data.is_check) {
        setStatusMessage("Check!");
      } else {
        setStatusMessage("");
      }
    } catch (error) {
      console.error("PvC API Error:", error);
      setStatusMessage("Failed to reach the server.");
    } finally {
      setAwaitingEngine(false);
    }
  };

  const handleSquareClick = (row, col) => {
    if (awaitingEngine || pendingPromotion) return;

    const piece = board[row][col];

    if (!selected) {
      if (!piece) return;
      const pieceColor = piece[0] === "w" ? "white" : "black";

      // Human can only select their own pieces when it is their turn
      if (pieceColor !== yourColor || turn !== "white") {
        return;
      }

      setSelected({ row, col });
      return;
    }

    const fromSquare = rowColToSquare(selected.row, selected.col);
    const toSquare = rowColToSquare(row, col);
    const selectedPiece = board[selected.row][selected.col];

    // Check for pawn promotion (White moving to Rank 8 / Row 0)
    const isPawn = selectedPiece && selectedPiece.endsWith("p");
    const isPromotionRank = row === 0;

    if (isPawn && isPromotionRank) {
      setPendingPromotion({ from: fromSquare, to: toSquare });
      setSelected(null);
      return;
    }

    sendMoveToEngine(fromSquare, toSquare);
    setSelected(null);
  };

  const resetGame = () => {
    setFen(STARTING_FEN);
    setBoard(fenToBoard(STARTING_FEN));
    setTurn("white");
    setSelected(null);
    setStatusMessage("");
    setAwaitingEngine(false);
    setPendingPromotion(null);
  };

  return (
    <div className="chess-container">
      <h2>Player vs Computer</h2>
      <p>Turn: {turn === "white" ? "White (You)" : "Black (Computer)"}</p>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px" }}>Difficulty: </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          disabled={awaitingEngine}
        >
          <option value={1}>Easy (Depth 1)</option>
          <option value={2}>Medium (Depth 2)</option>
          <option value={3}>Hard (Depth 3)</option>
          <option value={4}>Expert (Depth 4)</option>
        </select>
        <button onClick={resetGame} style={{ marginLeft: "15px" }}>
          Reset Game
        </button>
      </div>

      {statusMessage && <p className="status-message">{statusMessage}</p>}

      <div className="wood-frame" style={{ position: "relative" }}>
        {/* PROMOTION PICKER OVERLAY */}
        {pendingPromotion && (
          <div className="promotion-overlay">
            <div className="promotion-picker">
              <h3>Choose Promotion</h3>
              <div className="promotion-options">
                {["q", "r", "b", "n"].map((p) => (
                  <img
                    key={p}
                    src={pieces[`w${p}`]}
                    onClick={() =>
                      sendMoveToEngine(
                        pendingPromotion.from,
                        pendingPromotion.to,
                        p
                      )
                    }
                    alt={`Promote to ${p}`}
                    className="promotion-piece"
                  />
                ))}
              </div>
              <button onClick={() => setPendingPromotion(null)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="chess-board">
          {board.flat().map((piece, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const isLight = (row + col) % 2 === 0;
            const isSelected = selected?.row === row && selected?.col === col;

            return (
              <div
                key={index}
                onClick={() => handleSquareClick(row, col)}
                className={`square ${
                  isLight ? "light-square" : "dark-square"
                } ${isSelected ? "selected-square" : ""}`}
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