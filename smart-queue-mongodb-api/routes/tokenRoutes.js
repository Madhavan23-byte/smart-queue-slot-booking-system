const express = require("express");
const Token = require("../models/Token");

const router = express.Router();

// GET /tokens - Fetch all tokens
router.get("/", async (req, res) => {
  try {
    const tokens = await Token.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Tokens fetched successfully",
      data: tokens
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tokens",
      error: error.message
    });
  }
});

// POST /tokens - Book new token
router.post("/", async (req, res) => {
  try {
    const { userName, mobile, service, timeSlot } = req.body;

    if (!userName || !mobile || !service || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "userName, mobile, service, and timeSlot are required"
      });
    }

    const lastToken = await Token.findOne().sort({ tokenNumber: -1 });
    const nextTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 101;

    const token = await Token.create({
      userName,
      mobile,
      service,
      tokenNumber: nextTokenNumber,
      timeSlot,
      status: "Waiting"
    });

    res.status(201).json({
      success: true,
      message: "Token booked successfully",
      data: token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error booking token",
      error: error.message
    });
  }
});

// PUT /tokens/:id - Update token details/status
router.put("/:id", async (req, res) => {
  try {
    const token = await Token.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Token updated successfully",
      data: token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating token",
      error: error.message
    });
  }
});

// DELETE /tokens/:id - Delete/cancel token
router.delete("/:id", async (req, res) => {
  try {
    const token = await Token.findByIdAndDelete(req.params.id);

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Token deleted successfully",
      data: token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting token",
      error: error.message
    });
  }
});

module.exports = router;