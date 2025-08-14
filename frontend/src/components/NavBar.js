import React from "react";
import { getUserRole } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return React.createElement(
    "nav",
    { className: "bg-gray-100 border-b border-gray-300 py-3 px-6 flex justify-between items-center shadow" },
    [
      React.createElement(
        "h2",
        { className: "text-lg font-semibold text-gray-700", key: "title" },
        [
          "🔐 ProCMS ",
          React.createElement("span", { className: "text-xs text-gray-500", key: "subtitle" }, "by Billionare")
        ]
      ),
      React.createElement(
        "div",
        { className: "flex items-center space-x-4", key: "controls" },
        [
          React.createElement(
            "span",
            { className: "text-sm text-gray-600", key: "role" },
            [
              React.createElement("span", { className: "font-medium", key: "label" }, "Role:"),
              " " + role
            ]
          ),
          React.createElement(
            "button",
            {
              onClick: handleLogout,
              className: "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200",
              key: "logoutBtn"
            },
            "Logout"
          )
        ]
      )
    ]
  );
};

export default NavBar;
