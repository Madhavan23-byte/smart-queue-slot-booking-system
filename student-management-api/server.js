const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Custom middleware to display request method in terminal
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
});

// Student data stored in an array
let students = [
  {
    id: 1,
    name: "Madhavan ",
    rollNo: "2403717610421101",
    department: "Computer Science",
    year: "III Year"
  },
  {
    id: 2,
    name: "Kanish",
    rollNo: "2403717610421102",
    department: "Information Technology",
    year: "III Year"
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Student Management REST API is running");
});

// GET /students -> Fetch all students
app.get("/students", (req, res) => {
  res.status(200).json({
    message: "Students fetched successfully",
    data: students
  });
});

// POST /students -> Add a new student
app.post("/students", (req, res) => {
  const { name, rollNo, department, year } = req.body;

  if (!name || !rollNo || !department || !year) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    rollNo,
    department,
    year
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    data: newStudent
  });
});

// PUT /students/:id -> Update student details
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, rollNo, department, year } = req.body;

  const student = students.find((student) => student.id === studentId);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = name || student.name;
  student.rollNo = rollNo || student.rollNo;
  student.department = department || student.department;
  student.year = year || student.year;

  res.status(200).json({
    message: "Student updated successfully",
    data: student
  });
});

// DELETE /students/:id -> Delete a student
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);

  const studentExists = students.some((student) => student.id === studentId);

  if (!studentExists) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students = students.filter((student) => student.id !== studentId);

  res.status(200).json({
    message: "Student deleted successfully",
    data: students
  });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});