import React, { useEffect, useState } from "react";
import { apiFetcher } from "../utils/fetcher";   // ✅ REAL fetcher imported

const categoriesList = ["All", "Technology", "Health", "Education"];

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch articles from backend
  useEffect(() => {
    async function loadPublished() {
      try {
        const res = await apiFetcher("/articles?status=Approved"); // ✅ FIXED
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

  // Navigation
  const navigate = (path) => {
    window.location.href = path;
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10 text-center" },
    [
      React.createElement("h1", { key: "title", className: "text-4xl font-bold text-gray-800 mb-2" }, "📋 Welcome to ProCMS"),
      React.createElement("p", { key: "subtitle", className: "text-gray-600 max-w-xl mx-auto mb-6" },
        "Your publishing platform for editorial collaboration, role-based access, and real-time content delivery. Browse published articles below or log in to contribute."
      ),
      React.createElement("input", {
        key: "search",
        type: "text",
        placeholder: "Search articles...",
        className: "w-full sm:w-1/2 mb-6 p-2 border rounded",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value)
      }),

      // Categories
      React.createElement(
        "div",
        { key: "categories", className: "flex flex-wrap gap-3 justify-center mb-6" },
        categoriesList.map((cat) =>
          React.createElement(
            "button",
            {
              key: cat,
              className: `px-3 py-1 rounded-full text-sm transition ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`,
              onClick: () => setActiveCategory(cat)
            },
            cat
          )
        )
      ),

      // Articles
      React.createElement(
        "div",
        { key: "articles", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" },
        filteredArticles.length === 0
          ? React.createElement("p", { className: "text-sm text-gray-600" }, "🔍 No articles match your filters.")
          : filteredArticles.map(({ id, title, content, category, imageUrl }) =>
              React.createElement(
                "div",
                { key: id, className: "bg-white border rounded p-4 shadow hover:shadow-md transition text-left" },
                [
                  imageUrl
                    ? React.createElement("img", {
                        key: "img-" + id,
                        src: imageUrl,
                        alt: title,
                        className: "w-full h-40 object-cover rounded mb-3"
                      })
                    : null,
                  React.createElement("h3", { key: "title-" + id, className: "text-lg font-semibold mb-2" }, title),
                  React.createElement(
                    "span",
                    { key: "cat-" + id, className: "inline-block mb-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full" },
                    category
                  ),
                  React.createElement("p", { key: "content-" + id, className: "text-sm text-gray-700 mb-3" }, content.slice(0, 120) + "..."),
                  React.createElement(
                    "button",
                    { key: "btn-" + id, className: "text-blue-600 hover:underline text-sm", onClick: () => navigate(`/article/${id}`) },
                    "Read More →"
                  )
                ]
              )
            )
      ),

      // Navigation buttons
      React.createElement(
        "div",
        { key: "nav-buttons", className: "grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center" },
        [
          { text: "🔐 Login", path: "/login", color: "bg-blue-600 hover:bg-blue-700" },
          { text: "📝 Editor", path: "/editor", color: "bg-purple-600 hover:bg-purple-700" },
          { text: "📚 Publisher", path: "/publisher", color: "bg-green-600 hover:bg-green-700" },
          { text: "👑 Admin", path: "/admin", color: "bg-red-600 hover:bg-red-700" }
        ].map((btn) =>
          React.createElement(
            "button",
            {
              key: btn.path,
              onClick: () => navigate(btn.path),
              className: `${btn.color} text-white py-2 px-4 rounded`
            },
            btn.text
          )
        )
      ),

      // Footer
      React.createElement("footer", { key: "footer", className: "mt-12 text-xs text-gray-500" }, "Built by Billionare • Powered by Vite, Tailwind & PostgreSQL")
    ]
  );
};

export default Home;
