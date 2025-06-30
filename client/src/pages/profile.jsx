import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
    

const Profile = () => {
  const [message, setMessage] = useState("");
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Signup/login ke baad store kara hoga
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 This is important!
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  fetchProfile();
}, []);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Profile;
