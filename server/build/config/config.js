"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
dotenv.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@momble.s8lueix.mongodb.net/`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 2020;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
