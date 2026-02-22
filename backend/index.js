import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 5000;
let students = [];

// This is a middleware to parse json to js object and attach data to req.body
app.use(express.json());

// // ____________________________
// // endpoint // API
// // ____________________________
// app.get("/", (req, res) => {
//   res.send("Student Management SaaS Backend is running");
// });

// // ____________________________
// // endpoint // API
// // ____________________________
// app.get("/students", (req, res) => {
//   res.json({
//     count: students.length,
//     data: students,
//   });
// });

// // ____________________________
// // endpoint // API
// // ____________________________
// app.post("/students", (req, res) => {
//   const student = { id: Date.now().toString(), ...req.body };

//   students.push(student);

//   res.status(201).json({
//     message: "Student created successfully.",
//     data: student,
//   });
// });

// // ____________________________
// // endpoint // API
// // ____________________________
// app.delete("/students/:id", (req, res) => {
//   // req.params is always a string (from the URL).
//   const { id } = req.params;

//   const initialLength = students.length;
//   students = students.filter((student) => student.id !== id);

//   if (students.length === initialLength) {
//     return res.status(404).json({
//       message: "Student not found.",
//     });
//   }

//   res.json({
//     message: "Student deleted successfully.",
//   });
// });

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
