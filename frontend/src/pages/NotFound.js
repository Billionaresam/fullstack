<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>404 - Page Not Found</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 3rem;
      color: #e53e3e; /* red tone */
    }
    p {
      color: #4a5568; /* gray tone */
      margin-bottom: 1rem;
    }
    button {
      background-color: #3182ce; /* blue tone */
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:hover {
      background-color: #2b6cb0;
    }
  </style>
</head>
<body>

  <h1>⚠️ 404</h1>
  <p>The page you're looking for doesn’t exist.</p>
  <button id="goHomeBtn">🔙 Go Home</button>

  <script>
    document.getElementById("goHomeBtn").addEventListener("click", function() {
      window.location.href = "/";
    });
  </script>

</body>
</html>
