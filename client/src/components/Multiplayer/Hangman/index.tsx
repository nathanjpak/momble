import Players from "./Players";
import { nanoid } from "nanoid";

export default function HangmanMultiplayer({
  gameData,
  occupants,
}: {
  gameData: any;
  occupants: Array<string | null>;
}) {
  return (
    <div>
      {occupants.map((id) => {
        const playerData = id ? gameData?.players[id] : null;
        if (playerData)
          return (
            <Players
              key={nanoid()}
              name={playerData.name}
              points={playerData.points}
              currentTurn={playerData.currentTurn}
              ready={playerData.ready}
            />
          );
      })}
    </div>
  );
}
