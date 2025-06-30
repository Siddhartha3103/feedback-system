// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const path = require("path");
const feedbackRoutes = require("./routes/feedback");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve public folder (add before routes)
app.use(express.static(path.join(__dirname, "public")));

// Import routes before using them

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Feedback System API is running ✅");
});

// DB Connection + Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB error:", err);
});



