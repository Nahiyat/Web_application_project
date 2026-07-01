import { useState } from "react";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";

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