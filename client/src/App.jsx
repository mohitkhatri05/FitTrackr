// ✅ App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Profile from "./pages/profile.jsx";
import CompleteProfile from "./pages/completeProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/dashboard.jsx"; // Uncomment if you have a Dashboard page
import AppLayout from "./components/AppLayout";
import WorkoutTracker from "./pages/WorkoutTracker";
import Blog from "./pages/Blog";

function App() {
  return (
    // <BrowserRouter>
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/complete-profile" element={<CompleteProfile />} />

  {/* Protected Routes with Sidebar */}
  <Route path="/" element={<AppLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="workouts" element={<WorkoutTracker />} />
    <Route path="blog" element={<Blog />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>
    // </BrowserRouter>
  );
}

export default App;
