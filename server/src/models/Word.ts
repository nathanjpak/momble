import mongoose, {Schema} from "mongoose";

const WordSchema: Schema = new Schema({
  word: { type: String, required: true},
  // Parts of speech include: noun, verb, adjective, adverb, preposition
  partOfSpeech: { type: String, required: true },
  definition: { type: String },
  // Levels include a1, a2
  level: [{ type: String }]
}, {
  versionKey: false
});

module.exports = mongoose.model("Word", WordSchema);