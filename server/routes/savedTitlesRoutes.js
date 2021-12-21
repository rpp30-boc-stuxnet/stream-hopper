const express = require("express");
const router = express.Router();
const savedTitlesControllers = require("../../database/controllers/savedTitles.js");

router.get("/", savedTitlesControllers.findSavedTitles);
router.post("/", savedTitlesControllers.addSavedTitle);
router.delete("/", savedTitlesControllers.deleteSavedTitle)

module.exports = router;
