let students = [];

export function createStudent(req, res) {
  const student = { id: Date.now().toString(), ...req.body };

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

export function deleteStudent(req, res) {
  const { id } = req.params;

  const initialLength = students.length;

  students = students.filter((student) => {
    student.id !== id;
  });

  if (students.length === initialLength) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json({
    message: "Student deleted successfully",
  });
}
