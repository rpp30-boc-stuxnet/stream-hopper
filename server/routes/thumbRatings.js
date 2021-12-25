const express = require("express");
const router = express.Router();
const thumbRatings = require("../../database/controllers/thumbRatings.js");

router.get("/", thumbRatings.findThumbRatings);
// router.post("/", savedTitlesControllers.addSavedTitle);
// router.delete("/", savedTitlesControllers.deleteSavedTitle)

module.exports = router;
