import express from "express";

import { WordModel } from "../models/Word";

const router = express.Router();

// GET random word(s)
router.get("/:level", async (req, res) => {
  const level = req.params.level;
  let count:number = Number(req.query.count);
  if (!count) count = 1;
  let min:number = Number(req.query.min);
  if (!min) min = 4;

  const [err, result] = await WordModel.aggregate(
    [ 
      { $match: { level: level } },
      { $redact: {
        $cond: [
          { $gt: [ { $strLenCP: "$word" }, min ] },
          "$$KEEP",
          "$$PRUNE"
        ]
      } },
      { $sample: { size: count } } 
    ]
  ).exec();

  if (err) res.send(err).end();
  res.send(result).status(200);
});

module.exports = router;
