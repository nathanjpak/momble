import { Server, Socket } from "socket.io";
import { HangmanPlayer } from "../models/Games";
import { PrivateRoomModel } from "../models/PrivateRoom";
import { getWords } from "./util/functions";

const registerHangmanHandlers = (io:Server, socket:Socket) => {
  const updatePlayer = async (roomId: string, playerData: HangmanPlayer) => {
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
    });
  };

  const startGame = async (room: any, keepTurnQueue = false, level = "a1") => {
    const word = await getWords({ level: level, count: 1, min: 5 });
    if (word) room.gameData.word = word[0].word.toLowerCase();

    room.gameData.remainingLetters = new Map<string, number>();

    for (let letter of room.gameData.word) {
      if (room.gameData.remainingLetters.has(letter)) {
        room.gameData.remainingLetters.set(letter, room.gameData.remainingLetters.get(letter) + 1);
      } else if (letter !== " ") {
        room.gameData.remainingLetters.set(letter, 1);
      }
    }

    if (!keepTurnQueue) {
      const turnQueue = new Array(room.occupants.length * 3);

      for (let index=0; index < room.occupants.length * 3; index++) {
        const playerIndex = index % room.occupants.length;
        turnQueue[index] = room.occupants[playerIndex];
      };

      room.gameData.turnQueue = turnQueue;
    }

    room.gameData.guessedLetters = [];
    room.gameData.correctLetters = [];
  }

  const handleWin = async (room: any, word: string, correctLetters: string[]) => {
    let points = correctLetters.length < 2 ? 100 : (room.gameData.word.length - room.gameData.correctLetters.length) * 10;
    if (points > 100) points = 100;
    
    const winner = room.gameData.players.get(socket.id);

    for (let player of room.gameData.players) {
      player.skipTurn = false;
    }

    winner.points += points;
    await startGame(room, true);

    await room.save();

    io.to(room._id).emit("game-over", room.gameData);
    io.to(room._id).emit("broadcast-win", { authorId: socket.id, msg: word, points: points })
  };

  const handleTurn = async (roomId: string, sensitiveGuess: string) => {
    const guess = sensitiveGuess.toLowerCase();

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


    room.gameData.turnQueue.shift();
    room.gameData.turnQueue.push(socket.id);

    if (isCorrect) {
      if (isWord)
        return handleWin(room, room.gameData.word, room.gameData.correctLetters);
      room.gameData.correctLetters.push(guess);
      room.gameData.remainingLetters.delete(guess);
      if (room.gameData.remainingLetters.size === 0)
        return handleWin(room, room.gameData.word, room.gameData.correctLetters);
    }

    const nextPlayerId = room.gameData.turnQueue[0];
    let nextPlayer = room.gameData.players.get(nextPlayerId);

    while (nextPlayer.skipTurn) {
      nextPlayer.skipTurn = false;
      room.gameData.turnQueue.push(nextPlayerId);
      room.gameData.turnQueue.shift();
      nextPlayer = room.gameData.players.get(nextPlayerId);
    }

    if (!isCorrect && isWord) {
      const currentPlayer = room.gameData.players.get(socket.id);
      currentPlayer.skipTurn = true;
    }

    await room.save().then(() => {
      io.to(roomId).emit("update-game", room.gameData);
      io.to(roomId).emit("broadcast-guess", {authorId: socket.id, msg: guess, correct: isCorrect });
    });
  }

  const handleDisconnect = async () => {
    if (socket.data.gameRoom) {
      const room = await PrivateRoomModel.findOne( {_id: socket.data.gameRoom} );
      if (!room) return;
      if (room.game !== "hangman") return;
      room.gameData.players.delete(socket.id);
      room.gameData.turnQueue = [];
      room.gameData.word = "";
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