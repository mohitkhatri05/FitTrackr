
// ✅ pages/CompleteProfile.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    gender: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      alert("Profile updated!");
      navigate("/dashboard");
    } else {
      alert(data.message || "Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="gender"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>
    </form>
  );
};

export default CompleteProfile;