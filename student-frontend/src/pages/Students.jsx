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

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  if (loading) {
    return <p className="p-10 text-center">Loading students...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Management</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {/* <h1 className="text-3xl font-bold mb-6">Student Management</h1> */}
      <h3 className="text-1xl font-bold mb-6">
        {editId ? "Edit Student" : "Add Student"}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-10">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2 className="bg-gray-200 m-2 p-2 text-black rounded font-bold">
        Student Dashboard
      </h2>

      <table border="1" cellPadding="10" className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Roll Number</th>
            <th className="p-3 border">Course</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.rollNumber}</td>
              <td className="border p-2">{student.course}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
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
