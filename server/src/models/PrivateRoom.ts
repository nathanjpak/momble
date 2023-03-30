import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { GameName, HangmanData } from "./Games";

export class PrivateRoom {
  @prop()
  public _id!: string;

  @prop()
  maxOccupany!: number;

  @prop({ enum: GameName })
  game!: GameName;

  @prop({ type: String, required: true, default: [] })
  occupants!: mongoose.Types.Array<string>;

  @prop({ default: false })
  gameStart!: boolean;

  @prop({ type: HangmanData })
  gameData!: HangmanData;
}

export const PrivateRoomModel = getModelForClass(PrivateRoom, {
  schemaOptions: {
    capped: { 
      size: 1024, 
      max: 100, 
      autoIndexId: false 
    }
  }
});
