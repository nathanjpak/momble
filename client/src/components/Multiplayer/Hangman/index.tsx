import Players from "./Players";
import { nanoid } from "nanoid";
import HangmanWord from "../../Games/Hangman/Word";
import HangmanKeyboard from "../../Games/Hangman/Keyboard";
import { useParams } from "react-router-dom";
import socket from "../../../socket";
import { useCallback, useState } from "react";
import HangmanWordInput from "./WordInput";

export default function HangmanMultiplayer({
  gameData,
  occupants,
}: {
  gameData: any;
  occupants: Array<string | null>;
}) {
  const wordToGuess = gameData.word;
  const userId = socket.id;
  const { roomId } = useParams();
  const currentTurn = gameData.turnQueue[0] === userId;

  const handleGuess = useCallback(
    (letter: string) => {
      if (gameData.guessedLetters.includes(letter)) return;

      socket.emit("hangman:play-turn", roomId, letter);
    },
    [gameData.guessedLetters]
  );

  return (
    <div>
      {occupants.map((id) => {
        const playerData = id ? gameData?.players[id] : null;
        const isUser = id === userId;

        if (playerData)
          return (
            <Players
              key={nanoid()}
              name={playerData.name}
              points={playerData.points}
              currentTurn={currentTurn && isUser}
              ready={playerData.ready}
            />
          );
      })}
      <div className="w-full relative bg-white flex flex-col items-center p-4 gap-8">
        <HangmanWord
          wordToGuess={wordToGuess}
          guessedLetters={gameData.guessedLetters}
          reveal={false}
        />
      </div>
      <HangmanKeyboard
        disabled={!currentTurn}
        activeLetters={gameData.correctLetters}
        inactiveLetters={gameData.guessedLetters.filter((letter: string) => {
          return !wordToGuess.includes(letter);
        })}
        addGuessedLetter={handleGuess}
        resetWord={() => {}}
      />
      <HangmanWordInput handleGuess={handleGuess} />
    </div>
  );
}
