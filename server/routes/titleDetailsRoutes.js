const express = require("express");
const router = express.Router();
const titleDetailsControllers = require("../../database/controllers/titleDetails.js");

router.get("/", titleDetailsControllers.findTitleDetails);

module.exports = router;
