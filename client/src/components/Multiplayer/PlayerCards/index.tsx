import { nanoid } from "nanoid";
import socket from "../../../socket";
import PlayerCard from "./Card";

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

  return (
    <div className="flex gap-4 justify-between">
      <PlayerCard
        data={{
          name: userPlayerData.name,
          points: userPlayerData?.points,
          currentTurn: currentId === userId,
          isUser: true,
          ready: userPlayerData.ready,
        }}
      />
      {currentId && userId !== currentId && (
        <PlayerCard
          data={{
            name: currentPlayerData.name,
            points: currentPlayerData?.points,
            currentTurn: true,
            isUser: false,
            ready: currentPlayerData.ready,
          }}
        />
      )}
      {occupants.map((id) => {
        if (id === userId || id === currentId) return;
        const playerData = id ? gameData?.players[id] : null;

        if (playerData) {
          return (
            <PlayerCard
              key={nanoid()}
              data={{
                isUser: false,
                name: playerData.name,
                points: playerData.points,
                currentTurn: false,
                ready: playerData.ready,
              }}
            />
          );
        } else {
          return (
            <PlayerCard
              key={nanoid()}
              data={{
                isUser: false,
                name: "",
                currentTurn: false,
                ready: false,
              }}
            />
          );
        }
      })}
    </div>
  );
}
