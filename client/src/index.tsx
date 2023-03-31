import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import GamesPage from "./components/Games";
import Hangman from "./components/Games/Hangman";
import CreateMultiplayer from "./components/CreateOrJoin/Create";
import JoinMultiplayer from "./components/CreateOrJoin/Join";
import TestGame from "./components/Multiplayer/Test";
import CreateOrJoin from "./components/CreateOrJoin";
import GamesRoomPage from "./components/Multiplayer";

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
          <Route path="test" element={<TestGame />} />
          <Route path=":roomId" element={<GamesRoomPage />} />
        </Route>
        <Route path="/r">
          <Route index element={<CreateOrJoin />} />
          <Route path="create" element={<CreateMultiplayer />} />
          <Route path="join" element={<JoinMultiplayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
