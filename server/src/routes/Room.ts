import express from "express";
import ShortUniqueId from "short-unique-id";

import { PrivateRoomModel } from "../models/PrivateRoom";

const router = express.Router();

// GET room by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const [err, room] = await PrivateRoomModel.findOne({
    _id: id
  }).then(room => ([null, room]), err => ([err, null]));

  if (err) res.send(err).end();
  res.send(room).status(200);
});

// POST room
router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);

  const uid = new ShortUniqueId({length: 6});
  const roomId = uid(),
    maxOccupany = data.maxOccupancy,
    game = data.game;

  const room = new PrivateRoomModel({
    _id: roomId,
    maxOccupany: maxOccupany,
    game: game
  });

  const [err, newRoom] = await room.save().then(newRoom => ([null, newRoom]), err => ([err, null]));

  if (err) res.send(err).end();
  res.send(newRoom).status(200);
});

module.exports = router;