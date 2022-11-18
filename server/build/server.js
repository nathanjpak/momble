"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Word = require("./models/Word");
const wordData = require("../data/words.json");
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
    // Healthcheck
    router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));
    // Error handling
    router.use((req, res, next) => {
        const error = new Error("not found");
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
    // Add words to db
    wordData.a2.prepositions.forEach((word) => {
        Word.find({ word: word, partOfSpeech: "preposition" }).exec((err, result) => {
            if (err) {
                console.log("not found!");
            }
            else {
                if (result.length > 0) {
                    Word.update({ word: word, partOfSpeech: "preposition" }, { $push: { level: "a2" } }).exec((err, result) => {
                        if (err)
                            console.log(err);
                        if (result)
                            console.log(`${word} updated!`);
                    });
                }
                else {
                    const newWord = new Word({
                        word: word,
                        partOfSpeech: "preposition",
                        level: ["a2"],
                    });
                    newWord.save();
                }
            }
        });
    });
    console.log("Finished!");
};
