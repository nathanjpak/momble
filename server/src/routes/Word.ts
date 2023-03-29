import express from "express";

const Word = require("../models/Word");

const router = express.Router();

// GET random word(s)
router.get("/:level", (req, res) => {
  const level = req.params.level;
  let count:number = Number(req.query.count);
  if (!count) count = 1;
  let min:number = Number(req.query.min);
  if (!min) min = 4;

  Word.aggregate(
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
  ).exec((error:object, result:object) => {
    if (error) res.send(error).end();
    res.send(result).status(200);
  })
});

module.exports = router;
