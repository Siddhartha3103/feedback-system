
const express = require("express");
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require("../controllers/feedbackController");

const requireLogin = require("../middleware/requireLogin");
const requireAdmin = require("../middleware/requireAdmin");

router.post("/", requireLogin, submitFeedback);
router.get("/", requireLogin, requireAdmin, getAllFeedbacks);

module.exports = router;

