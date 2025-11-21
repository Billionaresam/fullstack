import React, { useEffect, useState } from "react";
import { apiFetcher } from "../utils/fetcher"; // import real fetcher

const categoriesList = ["All", "Technology", "Health", "Education"];

const NotFound = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch articles
  useEffect(() => {
    async function loadPublished() {
      try {
        const res = await apiFetcher("/articles?status=Approved");
        setArticles(res);
      } catch (err) {
        console.error("Failed loading articles:", err);
      }
    }
    loadPublished();
  }, []);

  // Filtered articles
  const filteredArticles = articles
    .filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (article) =>
        activeCategory === "All" || article.category === activeCategory
    );

  // Navigation function
  const navigate = (path) => {
    window.location.href = path;
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10 text-center" },
    [
      React.createElement(
        "h1",
        { className: "text-4xl font-bold text-gray-800 mb-2", key: "title" },
        "📋 Welcome to ProCMS"
      ),
      React.createElement(
        "p",
        { className: "text-gray-600 max-w-xl mx-auto mb-6", key: "desc" },
        "Your publishing platform for editorial collaboration, role-based access, and real-time content delivery. Browse published articles below or log in to contribute."
      ),
      React.createElement("input", {
        key: "search",
        type: "text",
        placeholder: "Search articles...",
        className: "w-full sm:w-1/2 mb-6 p-2 border rounded",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
      }),
      // Categories
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-3 justify-center mb-6", key: "categories" },
        categoriesList.map((cat) =>
          React.createElement(
            "button",
            {
              key: cat,
              className:
                "px-3 py-1 rounded-full text-sm transition " +
                (activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"),
              onClick: () => setActiveCategory(cat),
            },
            cat
          )
        )
      ),
      // Articles
      React.createElement(
        "div",
        { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", key: "articles" },
        filteredArticles.length === 0
          ? React.createElement(
              "p",
              { className: "text-sm text-gray-600", key: "no-articles" },
              "🔍 No articles match your filters."
            )
          : filteredArticles.map(({ id, title, content, category, imageUrl }) =>
              React.createElement(
                "div",
                {
                  key: id,
                  className: "bg-white border rounded p-4 shadow hover:shadow-md transition text-left",
                },
                [
                  imageUrl &&
                    React.createElement("img", {
                      key: "img-" + id,
                      src: imageUrl,
                      alt: title,
                      className: "w-full h-40 object-cover rounded mb-3",
                    }),
                  React.createElement(
                    "h3",
                    { className: "text-lg font-semibold mb-2", key: "title-" + id },
                    title
                  ),
                  React.createElement(
                    "span",
                    { className: "inline-block mb-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full", key: "cat-" + id },
                    category
                  ),
                  React.createElement(
                    "p",
                    { className: "text-sm text-gray-700 mb-3", key: "content-" + id },
                    content.slice(0, 120) + "..."
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "text-blue-600 hover:underline text-sm",
                      key: "read-" + id,
                      onClick: () => navigate(`/article/${id}`),
                    },
                    "Read More →"
                  ),
                ]
              )
            )
      ),
      // Navigation Buttons
      React.createElement(
        "div",
        { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center", key: "nav" },
        [
          React.createElement(
            "button",
            {
              key: "login",
              onClick: () => navigate("/login"),
              className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded",
            },
            "🔐 Login"
          ),
          React.createElement(
            "button",
            {
              key: "editor",
              onClick: () => navigate("/editor"),
              className: "bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded",
            },
            "📝 Editor"
          ),
          React.createElement(
            "button",
            {
              key: "publisher",
              onClick: () => navigate("/publisher"),
              className: "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded",
            },
            "📚 Publisher"
          ),
          React.createElement(
            "button",
            {
              key: "admin",
              onClick: () => navigate("/admin"),
              className: "bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded",
            },
            "👑 Admin"
          ),
        ]
      ),
      // Footer
      React.createElement(
        "footer",
        { className: "mt-12 text-xs text-gray-500", key: "footer" },
        "Built by Billionare • Powered by Vite, Tailwind & PostgreSQL"
      ),
    ]
  );
};

export default NotFound;
