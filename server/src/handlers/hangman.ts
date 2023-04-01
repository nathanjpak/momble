import { Server, Socket } from "socket.io";
import { HangmanPlayer } from "../models/Games";
import { PrivateRoomModel } from "../models/PrivateRoom";
import { getWords } from "./util/functions";

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

    let gameStateChanged = false;

    // check if game needs to start or stop
    if (!room.occupants.includes(null)) {
      let unreadyPlayer = room.occupants.find((id: string) => {
        return (room.gameData.players[id]?.ready === false);
      });

      unreadyPlayer = (unreadyPlayer) ? true : false;

      if (unreadyPlayer === room.gameStart) {
        room.gameStart = !room.gameStart;
        gameStateChanged = true;
        if (room.gameStart) {
          const word = await getWords({ level: "a1", count: 1, min: 5 });
          if (word) room.gameData.word = word[0].word;
          console.log(word);
        } else {
          room.gameData.word = "";
        }
      }
    } else if (room.gameStart) {
      room.gameStart = false;
      room.gameData.word = "";
      gameStateChanged = true;
    }

    await room.save().then(() => {
      io.to(roomId).emit("update-game", room.gameData);
      console.log('Game updated.');
      if (gameStateChanged) io.to(roomId).emit("private-room:update", {data: room});
    });
  };

  socket.on("hangman:update-player", updatePlayer);
};

export default registerHangmanHandlers;