import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Profile from './pages/profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'



function App() {
  return (
    <BrowserRouter>
       
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* ✅ Protected Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
