const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Middleware to display request method
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Student Management MongoDB API is running");
});

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});