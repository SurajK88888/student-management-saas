import Student from "../models/Student.js";
import apiResponse from "../utils/apiresponse.js";

export async function createStudent(req, res, next) {
  const { name, email, rollNumber, course } = req.body;

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
      user: req.user.id,
    });

    // res.status(201).json(student);
    apiResponse(res, 201, "Student Created Successfully", student);
  } catch (error) {
    next(error);
  }
}

export async function getStudents(req, res, next) {
  try {
    const students = await Student.find({ user: req.user.id });
    if (!students) {
      const error = new Error("Students List not found!");
      error.statusCode = 404;
      return next(error);
    }
    // res.json(students);
    apiResponse(res, 200, "Students list accessed successfully", students);
  } catch (error) {
    next(error);
  }
}

export async function getStudentByID(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      const error = new Error("Invalid ID, Student not found!");
      error.statusCode = 404;
      return next(error);
    }

    // res.json(student);
    apiResponse(res, 200, "Student Found", student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      const error = new Error("Student not found!");
      error.statusCode = 404;
      return next(error);
    }
    // res.json(student);
    apiResponse(res, 200, "Student data updated successfully", student);
  } catch (error) {
    next(error);
  }
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

    // res.json({ message: "Student deleted successfully" });
    apiResponse(res, 200, "Student deleted successfully");
  } catch (error) {
    next(error);
  }
}
