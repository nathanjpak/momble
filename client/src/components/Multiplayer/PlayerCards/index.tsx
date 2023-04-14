import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import socket from "../../../socket";
import PlayerCard from "./Card";

export type TNotification = {
  msg?: string;
  authorId?: string;
  correct?: boolean;
  points?: number;
  id: string;
};

export default function PlayerCards({
  gameData,
  occupants,
}: {
  gameData: any;
  occupants: Array<string | null>;
}) {
  const userId = socket.id;
  const userPlayerData = gameData?.players[userId];
  const currentId = gameData?.turnQueue[0];
  const currentPlayerData = gameData?.players[currentId];

  const [notifications, setNotifications] = useState<TNotification[]>([]);

  useEffect(() => {
    const guessListener = async ({
      authorId,
      msg,
      correct,
    }: {
      authorId: string;
      msg: string;
      correct: boolean;
    }) => {
      const newId = nanoid();
      setNotifications((prev) => [
        ...prev,
        { id: newId, msg, authorId, correct },
      ]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((value) => value.id !== newId));
      }, 8000);
    };

    const gameOverListener = async ({
      authorId,
      msg,
      points,
    }: {
      authorId: string;
      msg: string;
      points: number;
    }) => {
      const newId = nanoid();
      setNotifications((prev) => [
        ...prev,
        { id: newId, msg, authorId, points },
      ]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((value) => value.id !== newId));
      }, 10000);
    };

    socket.on("broadcast-guess", guessListener);
    socket.on("broadcast-win", gameOverListener);

    return () => {
      socket.off("broadcast-guess", guessListener);
      socket.off("broadcast-win", gameOverListener);
    };
  }, []);

  return (
    <div className="flex gap-4 justify-between">
      <PlayerCard
        data={{
          id: userId,
          name: userPlayerData.name,
          points: userPlayerData?.points,
          currentTurn: currentId === userId,
          isUser: true,
          ready: userPlayerData.ready,
          notifications: notifications,
        }}
      />
      {currentId && userId !== currentId && (
        <PlayerCard
          data={{
            id: currentId,
            name: currentPlayerData.name,
            points: currentPlayerData?.points,
            currentTurn: true,
            isUser: false,
            ready: currentPlayerData.ready,
            notifications: notifications,
          }}
        />
      )}
      {occupants.map((id) => {
        if (id === userId || id === currentId) return;
        const playerData = id ? gameData?.players[id] : null;

        if (id !== null && playerData) {
          return (
            <PlayerCard
              key={nanoid()}
              data={{
                id: id,
                isUser: false,
                name: playerData.name,
                points: playerData.points,
                currentTurn: false,
                ready: playerData.ready,
                notifications: notifications,
              }}
            />
          );
        } else {
          return (
            <PlayerCard
              key={nanoid()}
              data={{
                id: "",
                isUser: false,
                name: "",
                currentTurn: false,
                ready: false,
                notifications: notifications,
              }}
            />
          );
        }
      })}
    </div>
  );
}
