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

    @prop({ type: String, required: true, default: [] })
    public correctLetters!: mongoose.Types.Array<String>;

    @prop({ enum: HangmanMode, default: HangmanMode.TRADITIONAL })
    public mode!: HangmanMode;

    @prop({ type: String, required: true, default: [] })
    public turnQueue!: Array<string>;

    @prop({ type: () => HangmanPlayer, _id: false, default: new Map<string, HangmanPlayer>})
    public players!: Map<string, HangmanPlayer>;
}

export class HangmanPlayer {
  @prop({ index: true })
  public name!: string;

  @prop({ default: 0 })
  public points!: number; 

  // @prop({ default: false })
  // public currentTurn!: boolean;

  @prop({ default: false })
  public ready!: false;
}