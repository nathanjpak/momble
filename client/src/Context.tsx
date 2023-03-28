import { createContext } from "react";

export const SoloContext = createContext({
  level: "a1",
  streak: 0,
  setLevel: (value: string) => {},
  setStreak: (value: number) => {},
});
