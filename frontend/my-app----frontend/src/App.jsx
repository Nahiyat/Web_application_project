/*
import { useState } from "react";

import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import PlayerDashboard from "./PlayerDashboard";
import ChessBoard from "./ChessBoard";

import "./index.css";

function App() {
  const [page, setPage] = useState("welcome");

  // Logged-in user information
  const [user, setUser] = useState(null);

  return (
    <>

      {page === "welcome" && (
        <WelcomePage
          onNext={() => setPage("login")}
        />
      )}


      {page === "login" && (
        <LoginPage
          setUser={setUser}
          onNext={() => setPage("dashboard")}
        />
      )}


      {page === "dashboard" && (
        <PlayerDashboard
          user={user}
          onPlay={() => setPage("chessboard")}
        />
      )}


      {page === "chessboard" && (
        <ChessBoard />
      )}
    </>
  );
}

export default App;
*/

// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import PlayerDashboard from "./PlayerDashboard";
import LoginPage from "./LoginPage";
import Chessboard from "./Chessboard"; // Adjust path if Chessboard is in pages/

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PlayerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chessboard"
        element={
          <ProtectedRoute>
            <Chessboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}