import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import GamesPage from "./components/Games";
import Hangman from "./components/Games/Hangman";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/g" element={<GamesPage />}>
          <Route path="hangman" element={<Hangman />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
