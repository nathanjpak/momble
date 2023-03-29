import { io } from "socket.io-client";

const URL = "http://localhost:2021";

const socket = io(URL, {
  autoConnect: false,
});

export default socket;
