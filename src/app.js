const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Node.js + PostgreSQL API 🚀");
});

module.exports = app;
