const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length < 5) {
      return res.status(400).json({ msg: "Feedback must be at least 5 characters" });
    }

    const feedback = new Feedback({
      userId: req.user.id,
      message
    });

    await feedback.save();
    res.status(201).json({ msg: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
