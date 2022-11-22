import React from "react";
import HangmanDrawing from "./Drawing";
import HangmanKeyboard from "./Keyboard";
import HangmanWord from "./Word";

export default function Hangman() {
  return (
    <div className="flex flex-col w-full p-2 space-y-4">
      <div className="w-full bg-white flex flex-col items-center gap-8">
        <HangmanDrawing />
        <HangmanWord />
      </div>
      <HangmanKeyboard />
    </div>
  );
}
