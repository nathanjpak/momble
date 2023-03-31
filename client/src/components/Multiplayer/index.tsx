import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";
import EnterName from "./EnterName";
import MultiplayerHeader from "./Header";

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

  const { roomId } = useParams();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const roomUpdateListener = (response: any) => {
      console.log(response.msg);
      console.log(response);
      setRoomData(response.data);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("private-room:update", roomUpdateListener);

    socket.connect();
    socket.emit("private-room:join", roomId, (roomData: RoomData) => {
      setRoomData(roomData);
    });

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("private-room:update", roomUpdateListener);
    };
  }, []);

  return (
    <>
      {roomData?._id && <MultiplayerHeader game={roomData.game} />}
      {isConnected && <p>Connected.</p>}
      {roomData?._id && <EnterName />}
    </>
  );
}
