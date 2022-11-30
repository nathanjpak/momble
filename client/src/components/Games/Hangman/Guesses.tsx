import React from "react";

type HangmanGuessesProps = {
  incorrectLetters: string[];
};

export default function HangmanGuesses({
  incorrectLetters,
}: HangmanGuessesProps) {
  return (
    <div className="absolute right-0 sm:right-10 lg:right-20 p-2 sm:p-6 sm:text-lg md:text-2xl lg:text-4xl">
      {incorrectLetters.map((letter) => (
        <div key={letter} className="text-red-400">
          {letter}
        </div>
      ))}
    </div>
  );
}
