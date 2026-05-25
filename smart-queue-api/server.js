const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

// Custom middleware to display request method in terminal
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
});

// Token data stored in an array
let tokens = [
  {
    id: 1,
    userName: "Madhavan Nagarajan",
    mobile: "9876543210",
    service: "College Office",
    tokenNumber: 101,
    timeSlot: "10:30 AM",
    status: "Waiting"
  },
  {
    id: 2,
    userName: "Arun Kumar",
    mobile: "9876543211",
    service: "Lab Help Desk",
    tokenNumber: 102,
    timeSlot: "10:45 AM",
    status: "Waiting"
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Smart Queue REST API is running");
});

// GET /tokens -> Fetch all tokens
app.get("/tokens", (req, res) => {
  res.status(200).json({
    message: "Tokens fetched successfully",
    data: tokens
  });
});

// POST /tokens -> Book a new token
app.post("/tokens", (req, res) => {
  const { userName, mobile, service, timeSlot } = req.body;

  if (!userName || !mobile || !service || !timeSlot) {
    return res.status(400).json({
      message: "userName, mobile, service, and timeSlot are required"
    });
  }

  const newToken = {
    id: tokens.length + 1,
    userName,
    mobile,
    service,
    tokenNumber: 100 + tokens.length + 1,
    timeSlot,
    status: "Waiting"
  };

  tokens.push(newToken);

  res.status(201).json({
    message: "Token booked successfully",
    data: newToken
  });
});

// PUT /tokens/:id -> Update token details/status
app.put("/tokens/:id", (req, res) => {
  const tokenId = parseInt(req.params.id);
  const { userName, mobile, service, timeSlot, status } = req.body;

  const token = tokens.find((token) => token.id === tokenId);

  if (!token) {
    return res.status(404).json({
      message: "Token not found"
    });
  }

  token.userName = userName || token.userName;
  token.mobile = mobile || token.mobile;
  token.service = service || token.service;
  token.timeSlot = timeSlot || token.timeSlot;
  token.status = status || token.status;

  res.status(200).json({
    message: "Token updated successfully",
    data: token
  });
});

// DELETE /tokens/:id -> Delete/cancel a token
app.delete("/tokens/:id", (req, res) => {
  const tokenId = parseInt(req.params.id);

  const tokenExists = tokens.some((token) => token.id === tokenId);

  if (!tokenExists) {
    return res.status(404).json({
      message: "Token not found"
    });
  }

  tokens = tokens.filter((token) => token.id !== tokenId);

  res.status(200).json({
    message: "Token deleted successfully",
    data: tokens
  });
});

// Server running on port 3001
app.listen(PORT, () => {
  console.log(`Smart Queue API running on http://localhost:${PORT}`);
});