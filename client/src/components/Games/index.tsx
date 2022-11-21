import React from "react";
import { Outlet } from "react-router-dom";

import GamesHeader from "./Header";

export default function GamesPage() {
  return (
    <>
      <GamesHeader />
      <Outlet />
    </>
  );
}
