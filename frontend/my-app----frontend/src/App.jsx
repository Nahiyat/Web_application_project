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

import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import PlayerDashboard from "./PlayerDashboard";
import LoginPage from "./LoginPage";
import Chessboard from "./Chessboard";
import WelcomePage from "./WelcomePage";


// Welcome page wrapper
function WelcomeRoute() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/login");
  };

  return <WelcomePage onNext={handleNext} />;
}


export default function App() {
  return (
    <Routes>

      {/* Welcome Page */}
      <Route path="/" element={<WelcomeRoute />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Registration */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PlayerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Chess Game */}
      <Route
        path="/chessboard/:gameId"
        element={
          <ProtectedRoute>
            <Chessboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
