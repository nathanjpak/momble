"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Word_1 = require("../models/Word");
const router = express_1.default.Router();
// GET random word(s)
router.get("/:level", async (req, res) => {
    const level = req.params.level;
    let count = Number(req.query.count);
    if (!count)
        count = 1;
    let min = Number(req.query.min);
    if (!min)
        min = 4;
    const [err, result] = await Word_1.WordModel.aggregate()
        .match({ level: level })
        .redact({ $gt: [{ "$strLenCP": "$word" }, min] }, "$$KEEP", "$$PRUNE")
        .sample(count)
        .exec()
        .then(result => ([null, result]), err => ([err, null]));
    if (err) {
        res.send(err).end();
    }
    else {
        res.status(200).send(result);
    }
});
module.exports = router;
