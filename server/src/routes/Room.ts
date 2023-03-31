import express from "express";
import ShortUniqueId from "short-unique-id";
import { HangmanData } from "../models/Games";

import { PrivateRoomModel } from "../models/PrivateRoom";

const router = express.Router();

// GET room by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const [err, room] = await PrivateRoomModel.findOne({
    _id: id
  }).then(room => ([null, room]), err => ([err, null]));

  if (err) res.send(err).end();
  res.status(200).send(room);
});

// POST room
router.post("/", async (req, res) => {
  const data = req.body;

  const uid = new ShortUniqueId({length: 6, dictionary: "alphanum_upper"});
  const roomId = uid(),
    maxOccupancy = data.maxOccupancy,
    game = data.game;

  const gameData = new HangmanData();

  const room = new PrivateRoomModel({
    _id: roomId,
    maxOccupancy: maxOccupancy,
    game: game,
    gameData: gameData
  });

  const [err, newRoom] = await room.save().then(newRoom => ([null, newRoom]), err => ([err, null]));

  (err) ? res.send(err).end() : res.status(200).send(newRoom);
});

module.exports = router;