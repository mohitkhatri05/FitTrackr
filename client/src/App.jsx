import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* baaki routes yaha */}
      </Routes>
    </Router>
    </>
  )
}

export default App
