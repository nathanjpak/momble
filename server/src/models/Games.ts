import { prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export enum GameName {
  HANGMAN = "hangman"
}

export enum HangmanMode {
  COOP = "coop",
  ROLLING = "rolling",
  TRADITIONAL = "traditional"
}

export class HangmanData {
    @prop()
    public host?: string;

    @prop({ default: "" })
    public word!: string;

    @prop({ type: String, required: true, default: [] })
    public guessedLetters!: mongoose.Types.Array<String>;

    @prop({ enum: HangmanMode, default: HangmanMode.TRADITIONAL })
    public mode!: HangmanMode;

    @prop({ type: () => [HangmanPlayer], default: [] })
    public players!: HangmanPlayer[];
}

export class HangmanPlayer {
  @prop({ index: true })
  public name!: string;

  @prop({ default: 0 })
  public points!: number;
}