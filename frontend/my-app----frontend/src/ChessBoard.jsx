import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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

// FEN -> 8x8 array. Row 0 = rank 8 (black side), matching visual top row.
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

export default function ChessBoard() {
  const { gameId } = useParams();
  const socketRef = useRef(null);

  // ALL useState hooks
  const [board, setBoard] = useState(fenToBoard(STARTING_FEN));
  const [connected, setConnected] = useState(false);
  const [yourColor, setYourColor] = useState(null);
  const [turn, setTurn] = useState("white");
  const [selected, setSelected] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [awaitingServer, setAwaitingServer] = useState(false);
  const [pendingPromotion, setPendingPromotion] = useState(null); // { from, to }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    let isCancelled = false;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/game/${gameId}?token=${token}`
    );

    ws.onopen = () => {
      if (!isCancelled) {
        console.log("✅ WebSocket connected");
        setConnected(true);
      }
    };

    ws.onmessage = (event) => {
      if (isCancelled) return;
      try {
        const message = JSON.parse(event.data);
        console.log("Received:", message);

        if (message.type === "state") {
          setBoard(fenToBoard(message.fen));
          
          // Always derive turn from FEN to avoid "white" vs "w" bugs
          const turnFromFen = message.fen.split(" ")[1] === "w" ? "white" : "black";
          setTurn(turnFromFen);
          setAwaitingServer(false);

          if (message.your_color) {
            setYourColor(message.your_color);
          }

          // Game over handling
          if (message.is_game_over) {
            const winnerText = message.winner === "draw" 
              ? "Game is a Draw!" 
              : `${message.winner.toUpperCase()} wins!`;
            
            const reasonText = message.reason ? `(${message.reason.replace(/_/g, " ")})` : "";
            setStatusMessage(`${winnerText} ${reasonText}`);
          } else if (message.is_check) {
            setStatusMessage("Check!");
          } else {
            setStatusMessage("");
          }
        }

        if (message.type === "error") {
          setStatusMessage(message.message);
          setSelected(null);
          setAwaitingServer(false);
        }
      } catch (e) {
        console.error("Error parsing message", e);
      }
    };

    ws.onclose = (event) => {
      if (!isCancelled) {
        console.log("❌ WebSocket closed", event.code);
        setConnected(false);
      }
    };

    ws.onerror = (err) => {
      if (!isCancelled) {
        console.error("WebSocket error:", err);
      }
    };

    socketRef.current = ws;

    return () => {
      isCancelled = true;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [gameId]);

  const sendMove = (from, to, promotion = "") => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const moveUCI = `${from}${to}${promotion}`;
      socketRef.current.send(JSON.stringify({
        type: "move",
        move: moveUCI,
      }));
      setAwaitingServer(true);
      setPendingPromotion(null);
    }
  };

  const handleSquareClick = (row, col) => {
    if (awaitingServer || pendingPromotion) return;

    const piece = board[row][col];

    if (!selected) {
      if (!piece) return;
      const pieceColor = piece[0] === "w" ? "white" : "black";

      if (pieceColor !== yourColor || yourColor !== turn) {
        return;
      }

      setSelected({ row, col });
      return;
    }

    const fromSquare = rowColToSquare(selected.row, selected.col);
    const toSquare = rowColToSquare(row, col);
    const selectedPiece = board[selected.row][selected.col];

    // Check if this is a pawn promotion
    const isPawn = selectedPiece && selectedPiece.endsWith('p');
    const isPromotionRank = (row === 0 || row === 7);

    if (isPawn && isPromotionRank) {
      setPendingPromotion({ from: fromSquare, to: toSquare });
      setSelected(null);
      return;
    }

    sendMove(fromSquare, toSquare);
    setSelected(null);
  };

  return (
    <div className="chess-container">
      <p>Game ID: {gameId}</p>
      <p>Status: {connected ? "Connected" : "Connecting..."}</p>
      <p>You are: {yourColor ?? "..."}</p>
      <p>Turn: {turn}</p>
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
                    src={pieces[`${yourColor[0]}${p}`]}
                    onClick={() => sendMove(pendingPromotion.from, pendingPromotion.to, p)}
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
                className={`square ${isLight ? "light-square" : "dark-square"} ${
                  isSelected ? "selected-square" : ""
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