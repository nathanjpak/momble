import { Server, Socket } from "socket.io";
import ShortUniqueId from "short-unique-id";
import { PrivateRoomModel } from "../models/PrivateRoom";
import { MongooseError } from "mongoose";

const registerPrivateRoomHandlers = (io:Server, socket:Socket) => {
  const createRoom = (socket:Socket, data: any) => {
    const uid = new ShortUniqueId({length: 6});
    const roomId = uid(),
      maxOccupancy = data.maxOccupancy || 2,
      game = data.game;

    const room = new PrivateRoomModel({
      _id: roomId,
      maxOccupany: maxOccupancy,
      game: game
    });

    room.save();

    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  };

  const joinRoom = async (socket:Socket, roomId:string) => {
    const room = await PrivateRoomModel.findOneAndUpdate({ _id: roomId }, {
      $push: {
        "occupants": socket.id
      }
    }, (err: MongooseError, res: any ) => {
      if (err) {
        socket.emit("There was an error joining the room.");
        console.log(err);
      } else {
        socket.join(room!._id);
        console.log(res);
      }
    });
  };
  
  socket.on("private-room:create", createRoom);
  socket.on("private-room:join", joinRoom);
};

export default registerPrivateRoomHandlers;