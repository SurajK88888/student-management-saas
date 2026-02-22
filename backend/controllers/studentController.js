let students = [];

export function createStudent(req, res) {
  const { name, rollNumber, email, course } = req.body;

  if (!name || !rollNumber || !email || !course) {
    return res.status(404).json({
      message: "All field are required: name, rollNumber, email, course",
    });
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
