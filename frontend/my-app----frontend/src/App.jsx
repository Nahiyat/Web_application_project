import { useState } from "react";

import WelcomePage from "./WelcomePage.jsx";
import LoginPage from "./LoginPage.jsx";

import "./index.css"; // or "./App.css" if you use that

function App() {
  const [page, setPage] = useState("welcome");

  return (
    <>
      {page === "welcome" ? (
        <WelcomePage onNext={() => setPage("login")} />
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;