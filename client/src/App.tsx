import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col">
      <Link to="g/hangman">Hangman</Link>
      <Link to="r">Multiplayer</Link>
    </div>
  );
}

export default App;
