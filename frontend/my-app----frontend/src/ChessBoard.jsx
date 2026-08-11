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
  const [pendingPromotion, setPendingPromotion] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    let isCancelled = false; // Prevents race conditions during StrictMode remounts

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

        const turnFromFen = message.fen.split(" ")[1] === "w" ? "white" : "black";
        setTurn(turnFromFen);   // ✅ use this instead of message.turn

        setAwaitingServer(false);

        if (message.your_color) {
          setYourColor(message.your_color);
        }

        if (message.is_checkmate) {
          setStatusMessage("Checkmate!");
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
      // Ignore handshake abortion errors caused by React StrictMode in development
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
    console.log("🔄 Turn is now:", turn);
  }, [gameId]);


  const handleSquareClick = (row, col) => {
    if (awaitingServer) return;

    const piece = board[row][col];
    const toSquare = rowColToSquare(row, col);

    // 1. If we are currently picking a promotion piece, ignore board clicks
    if (pendingPromotion) return;

    if (!selected) {
      if (!piece) return;
      const pieceColor = piece[0] === "w" ? "white" : "black";
      if (pieceColor !== yourColor || yourColor !== turn) return;
      setSelected({ row, col });
      return;
    }

    const fromSquare = rowColToSquare(selected.row, selected.col);
    const selectedPiece = board[selected.row][selected.col];

    // 2. Check if this is a promotion move
    // White pawn reaching row 0 OR Black pawn reaching row 7
    const isPromotion = 
      (selectedPiece === "wp" && row === 0) || 
      (selectedPiece === "bp" && row === 7);

    if (isPromotion) {
      setPendingPromotion({ from: fromSquare, to: toSquare });
      // Don't send yet! Wait for picker
    } else {
      sendMove(fromSquare, toSquare);
    }

    setSelected(null);
  };

  // Helper to send the move to WebSocket
  const sendMove = (from, to, promotion = "") => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const moveUCI = `${from}${to}${promotion}`;
      socketRef.current.send(JSON.stringify({
        type: "move",
        move: moveUCI,
      }));
      setAwaitingServer(true);
      setPendingPromotion(null); // Clear picker
    }
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
              {["q", "r", "b", "n"].map((p) => (
                <img
                  key={p}
                  src={pieces[`${yourColor[0]}${p}`]} // e.g. 'wq' or 'bq'
                  onClick={() => sendMove(pendingPromotion.from, pendingPromotion.to, p)}
                  alt="promote"
                />
              ))}
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