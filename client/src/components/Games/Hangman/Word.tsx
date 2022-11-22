import React from "react";

// const testWord = "reallybigword";

type HangmanWordProps = {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
};

export default function HangmanWord({
  wordToGuess,
  guessedLetters,
  reveal,
}: HangmanWordProps) {
  return (
    <div
      className="flex pb-2 sm:pb-4 gap-2 sm:gap-4 text-xs smartphone:text-sm sm:text-lg: md:text-2xl lg:text-4xl xl:text-6xl uppercase"
      style={{ fontFamily: "monospace" }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span className="border-b-4 border-black" key={index}>
          <span
            key={letter}
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
