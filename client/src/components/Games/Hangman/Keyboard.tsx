import React from "react";

const keys = {
  alphabetical: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  qwerty: [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ],
};

const keyboardStyle = {
  alphabetical: {
    gridTemplateColumns: "repeat(9, 1fr)",
  },
  qwerty: {
    gridTemplateColumns: "repeat(10, 1fr)",
  },
};

const buttonClassNames = {
  default:
    "bg-white shadow shadow-sm hover:enabled:shadow-md hover:enabled:-translate-y-0.5 active:shadow-sm active:enabled:transform-none",
  active: "bg-cyan-300 text-white",
  inactive: "opacity-40 bg-red-400 text-white",
};

type HangmanKeyboardProps = {
  disabled: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  resetWord: () => void;
};

export default function HangmanKeyboard({
  disabled,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  resetWord,
}: HangmanKeyboardProps) {
  return (
    <div className="grid gap-1 h-auto" style={keyboardStyle.alphabetical}>
      {keys.alphabetical.map((letter) => {
        const isActive = activeLetters.includes(letter);
        const isInactive = inactiveLetters.includes(letter);

        return (
          <button
            onClick={() => addGuessedLetter(letter)}
            className={`${buttonClassNames.default} ${
              isActive ? buttonClassNames.active : ""
            } ${isInactive ? buttonClassNames.inactive : ""}`}
            disabled={isInactive || isActive || disabled}
            key={letter}
          >
            {letter}
          </button>
        );
      })}
      <button
        onClick={() => resetWord()}
        className="bg-cyan-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:transform-none"
      >{`\u23CE`}</button>
    </div>
  );
}
