import React, { useEffect, useState } from "react";
import HangmanDrawing from "./Drawing";
import HangmanKeyboard from "./Keyboard";
import HangmanWord from "./Word";

import { fetchWord } from "../../../util/functions";

export default function Hangman() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [level, setLevel] = useState("a1");

  useEffect(() => {
    fetchWord(level).then((response) => {
      setWordToGuess(response.data[0].word);
    });
  }, [level]);

  return (
    <div className="flex flex-col w-full p-2 space-y-4">
      <div className="w-full bg-white flex flex-col items-center gap-8">
        <HangmanDrawing />
        <HangmanWord wordToGuess={wordToGuess} />
      </div>
      <HangmanKeyboard />
    </div>
  );
}
