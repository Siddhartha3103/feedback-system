const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedbackController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, submitFeedback); // Protected

module.exports = router;
