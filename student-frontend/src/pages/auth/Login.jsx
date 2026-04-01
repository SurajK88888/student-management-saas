// import { useState } from "react";
// import { loginUser } from "../../services/authService";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       let data = { email, password };
//       const res = await loginUser(data);
//       localStorage.setItem("token", res.token);
//       alert("Login Successful");
//     } catch (error) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 shadown-md rounded-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-4 rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-4 rounded"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="w-full bg-blue-600 text-white p-2 rounded"
//           onClick={handleLogin}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;

// Login
// ↓
// Save token in localStorage
// ↓
// Attach token to API requests
// ↓
// Authorization header

// Complete - Architecture for localStorage:
// Login
// ↓
// Receive JWT
// ↓
// Save in localStorage
// ↓
// Load into AuthContext
// ↓
// Attach token to API requests

import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");

      navigate("/students");
    } catch (error) {
      console.error("Login failed");
      toast.error("Invalid crendentials")
    }
  };

  return (
    <div className="max-w-md mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <button className="bg-green-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
