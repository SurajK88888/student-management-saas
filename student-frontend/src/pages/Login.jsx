import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      let data = { email, password };
      const res = await loginUser(data);
      localStorage.setItem("token", res.token);
      alert("Login Successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadown-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

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
