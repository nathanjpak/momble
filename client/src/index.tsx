import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import GamesPage from "./components/Games";
import Hangman from "./components/Games/Hangman";
import MultiplayerIndex from "./components/Multiplayer/CreateOrJoin";
import CreateMultiplayer from "./components/Multiplayer/Create";
import JoinMultiplayer from "./components/Multiplayer/Join";

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
        <Route path="/m">
          <Route index element={<MultiplayerIndex />} />
          <Route path="create" element={<CreateMultiplayer />} />
          <Route path="join" element={<JoinMultiplayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
