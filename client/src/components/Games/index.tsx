import { useState } from "react";
import { Outlet } from "react-router-dom";

import { LevelContext } from "../../Context";
import GamesHeader from "./Header";

export default function GamesPage() {
  const [level, setLevel] = useState("a1");

  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      <GamesHeader />
      <Outlet />
    </LevelContext.Provider>
  );
}
