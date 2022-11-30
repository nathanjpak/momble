import React, { useEffect, useState, useCallback } from "react";
import HangmanDrawing from "./Drawing";
import HangmanGuesses from "./Guesses";
import HangmanKeyboard from "./Keyboard";
import HangmanWord from "./Word";

import { fetchWord } from "../../../util/functions";
import Lose from "../../Modals/Lose";
import Win from "../../Modals/Win";

export default function Hangman() {
  const [level, setLevel] = useState("a1");
  const [lives, setLives] = useState(6);

  const [wordToGuess, setWordToGuess] = useState("");

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const resetWord = useCallback(() => {
    setGuessedLetters([]);
    fetchWord(level).then((response) => {
      setWordToGuess(response.data[0].word);
    });
  }, [level]);

  // const resetWord = () => {
  //   // setGuessedLetters([]);
  //   fetchWord(level).then((response) => {
  //     setWordToGuess(response.data[0].word);
  //   });
  // };

  useEffect(() => {
    resetWord();
  }, [resetWord]);

  useEffect(() => {
    wordToGuess.length >= 6 ? setLives(6) : setLives(7);
  }, [wordToGuess]);

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

  // Events for lose and win modals
  const onLose = () => {
    resetWord();
  };

  const onWin = () => {
    resetWord();
  };

  return (
    <div className="flex flex-col w-full p-2 sm:p-6 space-y-4">
      <div className="w-full relative bg-white flex flex-col items-center p-4 gap-8">
        <HangmanGuesses incorrectLetters={incorrectLetters} />
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          wordToGuess={wordToGuess}
          guessedLetters={guessedLetters}
          reveal={isLoser}
        />
        <Lose bool={isLoser} onEnter={onLose} />
        <Win bool={isWinner} onEnter={onWin} />
      </div>
      <HangmanKeyboard
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter((letter) =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        resetWord={resetWord}
      />
    </div>
  );
}
