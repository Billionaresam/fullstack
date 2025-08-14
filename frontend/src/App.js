import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import EditorDashboard from "./pages/EditorDashboard.js";
import PublisherDashboard from "./pages/PublisherDashboard.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,
      // Public Routes
      React.createElement(Route, {
        path: "/login",
        element: React.createElement(LoginForm, null)
      }),
      React.createElement(Route, {
        path: "/",
        element: React.createElement(Home, null)
      }),

      // Protected Routes
      React.createElement(Route, {
        path: "/admin",
        element: React.createElement(
          ProtectedRoute,
          { allowedRoles: ["Admin"] },
          React.createElement(AdminDashboard, null)
        )
      }),
      React.createElement(Route, {
        path: "/editor",
        element: React.createElement(
          ProtectedRoute,
          { allowedRoles: ["Editor"] },
          React.createElement(EditorDashboard, null)
        )
      }),
      React.createElement(Route, {
        path: "/publisher",
        element: React.createElement(
          ProtectedRoute,
          { allowedRoles: ["Publisher"] },
          React.createElement(PublisherDashboard, null)
        )
      }),

      // Fallback
      React.createElement(Route, {
        path: "*",
        element: React.createElement(NotFound, null)
      })
    )
  );
}

export default App;
