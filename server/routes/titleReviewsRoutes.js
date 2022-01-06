const express = require("express");
const router = express.Router();
const titleReviewsControllers = require("../../database/controllers/titleReviews.js");

router.get("/", titleReviewsControllers.findTitleReviews);
router.post("/", titleReviewsControllers.addTitleReview);

module.exports = router;
