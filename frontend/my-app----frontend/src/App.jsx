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
      {/* Welcome Page */}
      {page === "welcome" && (
        <WelcomePage
          onNext={() => setPage("login")}
        />
      )}

      {/* Login Page */}
      {page === "login" && (
        <LoginPage
          setUser={setUser}
          onNext={() => setPage("dashboard")}
        />
      )}

      {/* Player Dashboard */}
      {page === "dashboard" && (
        <PlayerDashboard
          user={user}
          onPlay={() => setPage("chessboard")}
        />
      )}

      {/* Chess Board */}
      {page === "chessboard" && (
        <ChessBoard />
      )}
    </>
  );
}

export default App;
