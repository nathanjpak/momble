import { getModelForClass, index, prop } from "@typegoose/typegoose";
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
  public maxOccupancy: number;

  @prop({ enum: GameName })
  public game!: GameName;

  @prop({ type: String, required: true, default: [null, null] })
  public occupants!: Array<string | null>;

  @prop({ default: false })
  public gameStart!: boolean;

  @prop({ type: HangmanData })
  public gameData!: HangmanData;

  constructor(maxOccupancy: number) {
    this.maxOccupancy = maxOccupancy;
    const occupants = new Array<string | null>(maxOccupancy).fill(null);
    this.occupants = occupants;
  };
}

export const PrivateRoomModel = getModelForClass(PrivateRoom);
