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
  const student = req.body;

  students.push(student);

  res.status(201).json({
    message: "Student created successfully.",
    data: student,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
