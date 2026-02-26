let students = [];

export function createStudent(req, res, next) {
  const { name, rollNumber, email, course } = req.body;

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

  const student = {
    id: Date.now().toString(),
    name: name,
    rollNumber: rollNumber,
    email: email,
    course: course,
  };

  students.push(student);

  res.status(201).json({
    message: "Student Created Successfully.",
    data: student,
  });
}

export function getStudents(req, res) {
  res.json({
    count: students.length,
    data: students,
  });
}

export function deleteStudent(req, res, next) {
  const { id } = req.params;

  const initialLength = students.length;

  students = students.filter((student) => {
    student.id !== id;
  });

  if (students.length === initialLength) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    return next(error);
    // return res.status(404).json({
    //   message: "Student not found",
    // });
  }

  res.json({
    message: "Student deleted successfully",
  });
}
