import express from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import { Server } from "socket.io";

import { config } from "./config/config";
import registerPrivateRoomHandlers from "./handlers/private-rooms";

// Routes
const wordRoutes = require("./routes/Word");
const roomRoutes = require("./routes/Room")

// Data
// const wordData = require("../data/words.json");

const router = express();

// Connect to Mongo
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority"})
  .then(() => {
    Logging.info("Connected to mongoDB.");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

// Only start server if Mongo connects
const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    })

    next();
  })

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // API rules
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use('/api', wordRoutes);
  router.use('/rooms', roomRoutes);

  // Healthcheck
  router.get("/ping", (req, res, next) => res.status(200).json({message: "pong"}));

  router.get("/", (req, res, next) => res.status(200).send("Hello"));

  // Error handling
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  const httpServer = http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

  // Setup web socket
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

  io.on("connection", (socket) => {
    console.log('User Connected: ', socket.id);
    registerPrivateRoomHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log('User disconnected: ', socket.id);
    });
  });

  console.log("Finished!");
};
