const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// GET /students - Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching students",
      error: error.message
    });
  }
});

// POST /students - Add new student
router.post("/", async (req, res) => {
  try {
    const { name, rollNo, department, year, email } = req.body;

    if (!name || !rollNo || !department || !year || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const student = await Student.create({
      name,
      rollNo,
      department,
      year,
      email
    });

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding student",
      error: error.message
    });
  }
});

// PUT /students/:id - Update student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message
    });
  }
});

// DELETE /students/:id - Delete student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message
    });
  }
});

module.exports = router;