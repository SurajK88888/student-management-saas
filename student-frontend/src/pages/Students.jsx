import { useState, useEffect } from "react";
import api from "../services/api.js";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  //   Runs after render.
  //   Empty [] means it runs only once (like componentDidMount).
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        if (res.success) {
          setStudents(res.data);
        }
      } catch (error) {
        console.error("Field to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <div className="">
        <div className="">
          <h2 className="">Student Dashboard</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roll Number</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.course}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Students;
