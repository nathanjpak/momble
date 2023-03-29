import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose, {Schema} from "mongoose";

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

// const WordSchema: Schema = new Schema({
//   word: { type: String, required: true},  
//   // Parts of speech include: noun, verb, adjective, adverb, preposition
//   partOfSpeech: { type: String, required: true },
//   definition: { type: String },
//   // Levels include a1, a2
//   level: [{ type: String }]
// }, {
//   versionKey: false
// });

// module.exports = mongoose.model("Word", WordSchema);