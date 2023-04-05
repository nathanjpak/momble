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
    socket.data.gameRoom = roomId;

    // check if game needs to start or stop
    if (!room.occupants.includes(null)) {
      let unreadyPlayer = room.occupants.find((id: string) => {
        return (room.gameData.players[id]?.ready === false);
      });

      if (!unreadyPlayer && room.gameData.word === "") {
        await startGame(room);
      };
    } else {
      room.gameData.word = "";
    }
    await room.save().then(() => {
      io.to(roomId).emit("update-game", room.gameData);
      console.log('Game updated.');
    });
  };

  const startGame = async (room: any, level = "a1") => {
    const word = await getWords({ level: level, count: 1, min: 5 });
    if (word) room.gameData.word = word[0].word;

    const turnQueue = new Array(room.occupants.length * 3);

    for (let index=0; index < room.occupants.length * 3; index++) {
      const playerIndex = index % room.occupants.length;
      turnQueue[index] = room.occupants[playerIndex];
    };
    
    room.gameData.turnQueue = turnQueue;
  }

  const handleWin = async (room: any, word: string, correctLetters: string[]) => {
    let points = (word.length - correctLetters.length) * 10;
    if (points > 100) points = 100;
    
    room.gameData.players[socket.id].points += points;
    room.gameData.word = "";

    await room.save();

    io.to(room._id).emit("game-over", {
      winner: socket.id,
      word: word,
      data: room.gameData
    });
  };

  const handleTurn = async (roomId: string, guess: string) => {
    const [err, room] = await PrivateRoomModel.findOne({ _id: roomId })
      .then(room => ([null, room]), err => ([err, null]));
    
    if (err) {
      io.emit("error", "There was an error retrieving data from the room.");
      console.log(err);
    }

    const isWord = (guess.length > 1)

    if (!isWord) room.gameData.guessedLetters.push(guess);

    const isCorrect = isWord ? 
      guess === room.gameData.word : room.gameData.word.includes(guess);

    if (isCorrect) {
      if (isWord)
        return handleWin(room, room.gameData.word, room.gameData.correctLetters);
      room.gameData.correctLetters.push(guess);
      if (room.gameData.correctLetters.length === room.gameData.word.length)
        return handleWin(room, room.gameData.word, room.gameData.correctLetters);
    }

    room.gameData.turnQueue.shift();
    room.gameData.turnQueue.push(socket.id);

    if (!isCorrect) {
      if (isWord) {
        let skippedTurn = false;
        const newQueue = room.gameData.turnQueue.reduce((acc: string[], curr: string) => {
          if (!skippedTurn && curr === socket.id) {
            skippedTurn = true;
            return acc;
          }
          acc.push(curr);
          return acc;
        }, []);
        room.gameData.turnQueue = newQueue;
      }
    }

    await room.save().then(() => {
      io.to(roomId).emit("update-game", room.gameData);
      console.log("Game updated.");
    });
  }

  const handleDisconnect = async () => {
    if (socket.data.gameRoom) {
      const room = await PrivateRoomModel.findOne( {_id: socket.data.gameRoom} );
      room?.gameData.players.delete(socket.id);
      await room?.save().then(() => {
        io.to(room._id).emit("update-game", room.gameData);
      });
    }
  };

  socket.on("hangman:update-player", updatePlayer);
  socket.on("hangman:play-turn", handleTurn);
  socket.on("disconnect", handleDisconnect);
};

export default registerHangmanHandlers;