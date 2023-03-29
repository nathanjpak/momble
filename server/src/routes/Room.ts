import express from "express";
import { MongooseError } from "mongoose";

import PrivateRoom from "../models/PrivateRoom";

const router = express.Router();

// GET room by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  PrivateRoom.findOne({
    _id: id 
  }, (err: MongooseError, room: any) => {
    if (err) res.send(err).end();
    res.send("Room found").status(200);
  });
});
