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

const initialBoard = [
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
  const { gameId } = useParams();
  const socketRef = useRef(null);

  const [board, setBoard] = useState(initialBoard);
  const [connected, setConnected] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No auth token found");
      return;
    }

    // Initialize the socket
    const ws = new WebSocket(
      `ws://localhost:8000/ws/game/${gameId}?token=${token}`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received:", message);

        if (message.type === "move") {
          const moveStr = message.data.move; // e.g. "e2e4"
          setBoard((prevBoard) => applyMove(prevBoard, moveStr));
        }
      } catch (e) {
        console.log("Received non-json message:", event.data);
      }
    };

    ws.onclose = (event) => {
      // code 1000 is a normal closure (like when we leave the page)
      if (event.code !== 1000) {
        console.log("❌ WebSocket closed unexpectedly", event);
      } else {
        console.log("ℹ️ WebSocket closed normally");
      }
      setConnected(false);
    };

    ws.onerror = (err) => {
      // This will still fire during StrictMode refreshes, but we can ignore it
      console.error("WebSocket error details:", err);
    };

    socketRef.current = ws;

    // CLEANUP FUNCTION
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        console.log("Cleaning up WebSocket connection...");
        ws.close(1000); // 1000 is "Normal Closure"
      }
    };
  }, [gameId]);

    // Converts "e2" -> { row: 6, col: 4 }
function squareToRowCol(square) {
  const file = square[0]; // 'a' - 'h'
  const rank = square[1]; // '1' - '8'

  const col = file.charCodeAt(0) - "a".charCodeAt(0); // a=0, b=1, ... h=7
  const row = 8 - parseInt(rank, 10); // rank 8 = row 0, rank 1 = row 7

  return { row, col };
}

// Applies a move like "e2e4" to a board array, returns NEW board
function applyMove(board, moveStr) {
  const from = moveStr.slice(0, 2); // "e2"
  const to = moveStr.slice(2, 4);   // "e4"

  const fromPos = squareToRowCol(from);
  const toPos = squareToRowCol(to);

  // Deep copy so React detects the state change
  const newBoard = board.map(row => [...row]);

  const piece = newBoard[fromPos.row][fromPos.col];
  newBoard[fromPos.row][fromPos.col] = null;
  newBoard[toPos.row][toPos.col] = piece;

  return newBoard;
}

    const sendMove = () => {
  const moveStr = "e2e4";

  if (socketRef.current?.readyState === WebSocket.OPEN) {
    const payload = {
      type: "move",
      move: moveStr,
      gameId: gameId,
    };

    socketRef.current.send(JSON.stringify(payload));

    // ✅ Apply immediately on sender's own board too
    setBoard((prevBoard) => applyMove(prevBoard, moveStr));

    console.log("✅ Move sent:", payload);
  } else {
    console.warn("Socket not open yet");
  }
};

  return (
    <div className="chess-container">
      <p>Game ID: {gameId}</p>
      <p>Status: {connected ? "Connected" : "Connecting..."}</p>

      <button onClick={sendMove}>Send Test Move</button>

      <div className="wood-frame">
        <div className="chess-board">
          {board.flat().map((piece, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const isLight = (row + col) % 2 === 0;

            return (
              <div
                key={index}
                className={`square ${isLight ? "light-square" : "dark-square"}`}
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