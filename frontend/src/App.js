import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.js"; // your component

import Home from "./pages/Home.js";
import Login from "./components/LoginForm.js";
import Admin from "./pages/AdminDashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Public home page */}
        <Route path="/" element={<Home />} />

        {/* Protected admin page */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']} element={<Admin />} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
