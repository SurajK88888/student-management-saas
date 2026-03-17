import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    course: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");

      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await api.put(`/students/${editId}`, formData);

        setStudents(
          students.map((student) =>
            student._id === editId ? res.data : student,
          ),
        );

        setEditId(null);
      } else {
        const res = await api.post("/students", formData);

        setStudents([...students, res.data]);

        setFormData({
          name: "",
          email: "",
          rollNumber: "",
          course: "",
        });
      }
    } catch (error) {
      console.error("Failed operation");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);

      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Failed to delete student");
    }
  };

  const handleEdit = (student) => {
    setEditId(student._id);

    setFormData({
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      course: student.course,
    });
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div>
      <h2>{editId ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2>Student Dashboard</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollNumber}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
