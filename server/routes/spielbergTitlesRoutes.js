const express = require("express");
const router = express.Router();
const spielbergTitlesControllers = require("../../database/controllers/spielbergTitles.js");

router.get("/", spielbergTitlesControllers.findSpielbergTitles);

module.exports = router;