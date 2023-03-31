import { Server, Socket } from "socket.io";
import { HangmanPlayer } from "../models/Games";
import { PrivateRoomModel } from "../models/PrivateRoom";

// Should I handle deleting player data on disconnecting?
const registerHangmanHandlers = (io:Server, socket:Socket) => {
  const updatePlayer = async (roomId: string, playerData: HangmanPlayer) => {
    console.log(`player update from ${roomId}`);
    console.log(playerData);
    
    const [err, room] = await PrivateRoomModel.findOne({ _id: roomId })
      .then(room => ([null, room]), err => [err, null]);

    if (err) {
      socket.emit("Error finding room.");
      console.log(err);
      return
    }

    room.gameData.players.set(socket.id, playerData);

    await room.save().then(() => {
      io.to(roomId).emit("update-game", room.gameData);
      console.log('Game updated.');
    });
  };

  socket.on("hangman:update-player", updatePlayer);
};

export default registerHangmanHandlers;