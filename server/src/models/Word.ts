import { getModelForClass, prop } from "@typegoose/typegoose";

export class Word {
  @prop({ type: String, required: true })
  public word!: string;

  @prop({ type: String, required: true })
  public partOfSpeech!: string;

  @prop({ type: Boolean, required: true, default: false })
  public phrase!: boolean;

  @prop({ type: Number, required: true })
  public length!: number;

  @prop({ type: String, required: true })
  public definition1!: string;

  @prop()
  public definition2?: string;

  @prop()
  public definition3?: string;

  @prop({ type: String, required: true })
  public level!: string;
}

export const WordModel = getModelForClass(Word);
