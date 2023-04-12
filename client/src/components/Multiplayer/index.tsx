import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";
import EnterName from "./EnterName";
import HangmanMultiplayer from "./Hangman";
import MultiplayerHeader from "./Header";
import PlayerCards from "./PlayerCards";

export class RoomData {
  _id!: string;

  maxOccupancy!: number;

  createdAt!: Date | undefined;

  game!: string;

  occupants!: Array<string | null>;

  gameStart!: boolean;

  gameData!: any;
}

export default function GamesRoomPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomData, setRoomData] = useState(new RoomData());
  const [joinedGame, setJoinedGame] = useState(false);
  const [gameData, setGameData] = useState({});

  const { roomId } = useParams();

  useEffect(() => {
    // Could move these to a separate file
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setJoinedGame(false);
    };

    const roomUpdateListener = (response: any) => {
      setRoomData(response.data);
    };

    const gameUpdateListener = (gameData: any) => {
      if (!joinedGame) {
        if (gameData.players[socket.id]) setJoinedGame(true);
      }
      setGameData(gameData);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("private-room:update", roomUpdateListener);
    socket.on("update-game", gameUpdateListener);
    socket.on("game-over", gameUpdateListener);

    socket.connect();
    socket.emit("private-room:join", roomId, (roomData: RoomData) => {
      setRoomData(roomData);
    });

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("private-room:update", roomUpdateListener);
      socket.off("update-game", gameUpdateListener);
      socket.off("game-over", gameUpdateListener);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {roomData?._id && <MultiplayerHeader game={roomData.game} />}
      {roomData?._id && !joinedGame && <EnterName game={roomData.game} />}
      {joinedGame && (
        <PlayerCards gameData={gameData} occupants={roomData.occupants} />
      )}
      {joinedGame && <HangmanMultiplayer gameData={gameData} />}
    </div>
  );
}
