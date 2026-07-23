import { useState } from "react";

import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import ChessBoard from "./ChessBoard";

import "./index.css"; // or "./App.css" if you use that

function App() {

  const [page, setPage] = useState("welcome");



  return (

    <>

      {page === "welcome" && (

        <WelcomePage onNext={() => setPage("login")} />

      )}



      {page === "login" && (

        <LoginPage onNext={() => setPage("chessboard")} />

      )}



      {page === "chessboard" && (

        <ChessBoard />

      )}

    </>

  );

}



export default App;
