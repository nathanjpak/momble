import { useState } from "react";
import { Outlet } from "react-router-dom";

import { SoloContext } from "../../Context";
import GamesHeader from "./Header";

export default function GamesPage() {
  const [level, setLevel] = useState("a1");
  const [streak, setStreak] = useState(0);

  return (
    <SoloContext.Provider value={{ level, streak, setLevel, setStreak }}>
      <GamesHeader />
      <Outlet />
    </SoloContext.Provider>
  );
}
