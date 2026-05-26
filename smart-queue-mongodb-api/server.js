const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const tokenRoutes = require("./routes/tokenRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Custom middleware to display request method
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Smart Queue MongoDB API is running");
});

app.use("/tokens", tokenRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Smart Queue MongoDB API running on http://localhost:${PORT}`);
});