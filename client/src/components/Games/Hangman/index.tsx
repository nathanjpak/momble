import React, { useEffect, useState, useCallback } from "react";
import HangmanDrawing from "./Drawing";
import HangmanKeyboard from "./Keyboard";
import HangmanWord from "./Word";

import { fetchWord } from "../../../util/functions";

export default function Hangman() {
  const [level, setLevel] = useState("a1");
  const [lives, setLives] = useState(6);

  const [wordToGuess, setWordToGuess] = useState("");

  useEffect(() => {
    fetchWord(level).then((response) => {
      setWordToGuess(response.data[0].word);
    });
  }, [level]);

  useEffect(() => {
    wordToGuess.length >= 6 ? setLives(6) : setLives(7);
  }, [wordToGuess]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= lives;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  // Add event listeners for keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  return (
    <div className="flex flex-col w-full p-2 space-y-4">
      <div className="w-full bg-white flex flex-col items-center gap-8">
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          wordToGuess={wordToGuess}
          guessedLetters={guessedLetters}
          reveal={isLoser}
        />
      </div>
      <HangmanKeyboard
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter((letter) =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
      />
    </div>
  );
}
