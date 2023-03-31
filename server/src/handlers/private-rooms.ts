import { Server, Socket } from "socket.io";
import { PrivateRoomModel } from "../models/PrivateRoom";

const registerPrivateRoomHandlers = (io:Server, socket:Socket) => {
  const joinRoom = async (roomId:string, callback: (res: any) => void) => {
    console.log(roomId);
    
    const [err, room] = await PrivateRoomModel.findOne({ _id: roomId })
      .then(room => ([null, room]), err => ([err, null]));

    if (err) {
      socket.emit(`Could not find room.`);
      console.log(err);
      return
    }

    if (room.occupants.includes(socket.id)) return;
    const emptySpotInRoom = room.occupants.indexOf(null);

    if (emptySpotInRoom === -1) {
      callback('Room is full.');
      return
    }

    room.occupants[emptySpotInRoom] = socket.id;
    await room.save().then(() => {
      socket.join(roomId);
      socket.emit(`Joined room ${room._id}`);
      callback(room);
      console.log('current rooms: ', socket.rooms);
    });
  };

  const leaveRoom = async () => {
    const roomList = socket.rooms;
    roomList.forEach(async (id) => {
      if (id !== socket.id) {
        const [err, room] = await PrivateRoomModel.findOne({ _id: id })
          .then(room => ([null, room]), err => ([err, null]));
        
        if (err) return;

        const spotToBeVacated = room.occupants.indexOf(socket.id);
        room.occupants[spotToBeVacated] = null;
        
        await room.save().then(() => {
          console.log('User left room: ', room._id);
        });
      };
    });
  };
  
  socket.on("private-room:join", joinRoom);
  socket.on("disconnecting", leaveRoom);
};

export default registerPrivateRoomHandlers;