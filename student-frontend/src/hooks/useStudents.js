import { useEffect, useState } from "react";
import api from "../services/api";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useEffect(true);
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/students");

      setStudents(res.data);
      setLoading(false);
    };

    fetchStudents();
  }, []);

  return { students, loading };
};
