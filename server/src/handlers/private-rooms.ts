import { Server, Socket } from "socket.io";
import ShortUniqueId from "short-unique-id";
import PrivateRoom from "../models/PrivateRoom";
import { MongooseError } from "mongoose";

const registerPrivateRoomHandlers = (io:Server, socket:Socket) => {
  const createRoom = (socket:Socket, data: any) => {
    const uid = new ShortUniqueId({length: 6});
    const roomId = uid(),
      maxOccupancy = data.maxOccupancy || 2,
      game = data.game;

    const room = new PrivateRoom({
      _id: roomId,
      maxOccupancy: maxOccupancy,
      game: game,
      occupants: [socket.id],
    });

    room.save();

    socket.join(roomId);
  };

  const joinRoom = async (socket:Socket, roomId:string) => {
    const room = await PrivateRoom.findOneAndUpdate({ _id: roomId }, {
      $push: {
        "occupants": socket.id
      }
    }, (err: MongooseError, room: any) => {
      if (err) {
        socket.emit("There was an error joining the room.");
        console.log(err);
      } else {
        socket.join(room._id);
      }
    });
  };
  
  socket.on("private-room:create", createRoom);
  socket.on("private-room:join", joinRoom);
};

export default registerPrivateRoomHandlers;