const express = require("express");
const router = express.Router();
const thumbRatings = require("../../database/controllers/thumbRatings.js");

router.get("/", thumbRatings.findThumbRatings);
router.post('/', thumbRatings.saveThumbRating);

module.exports = router;
