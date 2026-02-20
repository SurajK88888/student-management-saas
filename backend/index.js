import express from "express";

const app = express();
const PORT = 5000;
let students = [];

// This is a middleware to parse json to js object and attach data to req.body
app.use(express.json());

// endpoint // API
app.get("/", (req, res) => {
  res.send("Student Management SaaS Backend is running");
});

// endpoint //API
app.get("/students", (req, res) => {
  res.json({
    count: students.length,
    data: students,
  });
});

//endpoint // API
app.post("/students", (req, res) => {
  const student = { id: Date.now().toString(), info: req.body };

  students.push(student);

  res.status(201).json({
    message: "Student created successfully.",
    data: student,
  });
});

// endpoint // API
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const initialLength = students.length;
  students = students.filter((student) => student.id !== id);

  if (students.length === initialLength) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  res.json({
    message: "Student deleted successfully.",
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
