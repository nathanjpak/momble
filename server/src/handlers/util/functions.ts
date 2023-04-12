import { WordModel } from "../../models/Word";

export const getWords = async ({ level, count, min }: 
  { level: string, count: number, min: number }) => {
  const [err, result] = await WordModel.aggregate()
    .match({ level: level, phrase: false })
    .redact({ $gt: [ { "$strLenCP": "$word" }, min ] }, "$$KEEP", "$$PRUNE")
    .sample(count)
    .exec()
    .then(result => ([null, result]), err => ([err, null]));

  if (err) return null;
  return result;
};