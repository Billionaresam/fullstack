<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Profile</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    nav {
      background: #2563eb;
      color: white;
      padding: 1rem;
      font-size: 1.2rem;
      text-align: center;
    }
    .container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .avatar {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e5e7eb;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.2rem;
      color: #374151;
      border: 2px solid #d1d5db;
    }
    .role {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    .role.admin { background: #f3e8ff; color: #6b21a8; }
    .role.editor { background: #dbeafe; color: #1e40af; }
    .role.publisher { background: #d1fae5; color: #065f46; }
    .role.default { background: #f3f4f6; color: #374151; }
    .details p {
      font-size: 0.9rem;
      color: #374151;
    }
    .details span {
      font-weight: 600;
    }
    .loading {
      text-align: center;
      margin-top: 2rem;
      color: #6b7280;
    }
  </style>
</head>
<body>

  <nav>Navigation Bar</nav>

  <div id="loading" class="loading">Loading profile...</div>

  <div id="profile" class="container" style="display: none;">
    <div class="profile-header">
      <div id="avatar" class="avatar">NA</div>
      <div>
        <h2 id="email"></h2>
        <span id="roleBadge" class="role default"></span>
      </div>
    </div>
    <div class="details">
      <p><span>Staff ID:</span> <span id="staffId"></span></p>
      <p><span>Joined:</span> <span id="joinedDate"></span></p>
    </div>
  </div>

  <script>
    function getInitials(email) {
      return email ? email.slice(0, 2).toUpperCase() : 'NA';
    }

    function getRoleClass(role) {
      if (role === 'Admin') return 'role admin';
      if (role === 'Editor') return 'role editor';
      if (role === 'Publisher') return 'role publisher';
      return 'role default';
    }

    async function loadProfile() {
      try {
        const response = await fetch('/user/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const profile = await response.json();

        document.getElementById('loading').style.display = 'none';
        document.getElementById('profile').style.display = 'block';

        document.getElementById('avatar').textContent = getInitials(profile.email);
        document.getElementById('email').textContent = profile.email;
        document.getElementById('roleBadge').textContent = profile.role;
        document.getElementById('roleBadge').className = getRoleClass(profile.role);
        document.getElementById('staffId').textContent = profile.staffId;
        document.getElementById('joinedDate').textContent = new Date(profile.createdAt).toLocaleDateString();

      } catch (error) {
        document.getElementById('loading').textContent = 'Error loading profile';
        console.error(error);
      }
    }

    loadProfile();
  </script>

</body>
</html>
