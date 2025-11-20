import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // your component

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

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
