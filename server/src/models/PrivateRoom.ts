import mongoose, {Schema} from "mongoose";

const PrivateRoomSchema: Schema = new Schema({
  _id: {type: String},
  maxOccupancy: {type: Number, required: true},
  game: {type: String, required: true},
  occupants: [{type: String}],
}, {
  capped: {
    size: 1024,
    max: 100,
    autoIndexId: false,
  }
});

const PrivateRoom = mongoose.model("Private Room", PrivateRoomSchema);

export default PrivateRoom;