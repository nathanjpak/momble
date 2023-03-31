"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("./library/Logging"));
const socket_io_1 = require("socket.io");
const config_1 = require("./config/config");
const private_rooms_1 = __importDefault(require("./handlers/private-rooms"));
const hangman_1 = __importDefault(require("./handlers/hangman"));
// Routes
const wordRoutes = require("./routes/Word");
const roomRoutes = require("./routes/Room");
// Data
// const wordData = require("../data/words.json");
const router = (0, express_1.default)();
// Connect to Mongo
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("Connected to mongoDB.");
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error("Unable to connect: ");
    Logging_1.default.error(error);
});
// Only start server if Mongo connects
const StartServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
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
    router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));
    router.get("/", (req, res, next) => res.status(200).send("Hello"));
    // Error handling
    router.use((req, res, next) => {
        const error = new Error("not found");
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    const httpServer = http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
    // Setup web socket
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
    io.on("connection", (socket) => {
        console.log('User Connected: ', socket.id);
        (0, private_rooms_1.default)(io, socket);
        (0, hangman_1.default)(io, socket);
        socket.on("disconnect", () => {
            console.log('User disconnected: ', socket.id);
        });
    });
    console.log("Finished!");
};
