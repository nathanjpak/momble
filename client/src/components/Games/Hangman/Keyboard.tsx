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

export default function HangmanKeyboard() {
  return (
    <div className="grid gap-1 h-auto" style={keyboardStyle.alphabetical}>
      {keys.alphabetical.map((letter) => {
        return (
          <button
            className="bg-white shadow shadow-sm hover:shadow-md hover:-translate-y-0.5 active:shadow-sm active:transform-none"
            key={letter}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
