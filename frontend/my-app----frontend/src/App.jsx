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

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components & Pages
import Login from "./LoginPage";
import Register from "./pages/RegisterPage";
import PlayerDashboard from "./PlayerDashboard";
import ChessBoard from "./ChessBoard";
import PvCChessBoard from "./PvCChessBoard";
import MatchHistory from "./pages/MatchHistory";
import WelcomePage from "./WelcomePage";
import RankingPage from "./pages/RankingPage";


function WelcomeRoute() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/login");
  };

  return <WelcomePage onNext={handleNext} />;
}


// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<WelcomeRoute />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard & Game Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PlayerDashboard user={user} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pvc"
        element={
          <ProtectedRoute>
            <PvCChessBoard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chessboard/:gameId"
        element={
          <ProtectedRoute>
            <ChessBoard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MatchHistory />
          </ProtectedRoute>
        }
      />

      <Route 
          path="/ranking" 
          element={
            <ProtectedRoute>
              <RankingPage />
            </ProtectedRoute>
          } 
        />

      {/* Default / Fallback Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

