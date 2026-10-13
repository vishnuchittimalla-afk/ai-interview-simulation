
const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const {
  startInterview,
  submitAnswer
} = require("../controllers/interviewController");

const router = express.Router();

router.post("/start", authenticate, startInterview);

router.post("/:interviewId/answer", authenticate, submitAnswer);

module.exports = router;
