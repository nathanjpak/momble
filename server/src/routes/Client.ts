import express from "express";
import * as path from "path";

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../../client/.next/server/pages", "index.html"))
})

module.exports = router;
