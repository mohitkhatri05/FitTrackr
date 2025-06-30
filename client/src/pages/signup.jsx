import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Signup successful ✅");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed ❌");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong ❗");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
