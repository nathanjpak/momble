import { createContext } from "react";

export const LevelContext = createContext({
  level: "a1",
  setLevel: (value: string) => {},
});
