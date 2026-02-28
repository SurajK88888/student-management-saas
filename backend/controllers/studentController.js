import Student from "../models/Student.js";
let students = [];

export async function createStudent(req, res, next) {
  const { name, rollNumber, email, course } = req.body;
  try {
    if (!name || !rollNumber || !email || !course) {
      // Validation error handling using next(error) -> errorMiddleware
      const error = new Error(
        "All fields are required: name, rollNumber, email, course",
      );

      error.statusCode = 400; // attach HTTP status code
      return next(error); // forward error to centralized handler

      // Manually validation error handling
      // return res.status(400).json({
      //   message: "All fields are required: name, rollNumber, email, course",
      // });
    }

    const student = await Student.create({
      name,
      rollNumber,
      email,
      course,
    });

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
}

export async function getStudents(req, res) {
  const students = await Student.find();

  res.json(students);
}

export async function deleteStudent(req, res, next) {
  const { id } = req.params;

  // use mongoose model to remove
  try {
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      return next(error);
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
}
