import { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await api.post("/auth/register", formData)

      navigate("/login")

    } catch (error) {

      console.error("Register failed")

    }

  }

  return (

    <div className="max-w-md mx-auto p-10">

      <h1 className="text-2xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

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

        <button
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Register
        </button>

      </form>

    </div>

  )

}

export default Register