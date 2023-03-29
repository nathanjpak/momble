import { useEffect, useState } from "react";
import socket from "../../socket";

export default function TestGame() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.log(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return <div>Test Game Page</div>;
}
