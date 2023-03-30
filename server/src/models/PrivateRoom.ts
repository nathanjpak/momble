import { getModelForClass, index, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { GameName, HangmanData } from "./Games";

@index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 6 }
)
export class PrivateRoom {
  @prop()
  public _id!: string;

  @prop({ default: Date.now })
  public createdAt!: Date;

  @prop()
  public maxOccupany!: number;

  @prop({ enum: GameName })
  public game!: GameName;

  @prop({ type: String, required: true, default: [] })
  public occupants!: mongoose.Types.Array<string>;

  @prop({ default: false })
  public gameStart!: boolean;

  @prop({ type: HangmanData })
  public gameData!: HangmanData;
}

export const PrivateRoomModel = getModelForClass(PrivateRoom);
