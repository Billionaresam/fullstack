import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import EditorDashboard from "./pages/EditorDashboard.js";
import PublisherDashboard from "./pages/PublisherDashboard.js";
import ProtectedRoute from "./components/ProtectedRoute.js"; // fixed import
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={["Editor"]}>
              <EditorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publisher"
          element={
            <ProtectedRoute allowedRoles={["Publisher"]}>
              <PublisherDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
