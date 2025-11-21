import React, { useEffect, useState } from "react";
import { apiFetcher } from "../utils/fetcher";

const getInitials = (email) => (email ? email.slice(0, 2).toUpperCase() : "NA");

const getRoleClass = (role) => {
  if (role === "Admin") return "role admin";
  if (role === "Editor") return "role editor";
  if (role === "Publisher") return "role publisher";
  return "role default";
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiFetcher("/user/profile");
        setProfile(data);
      } catch (err) {
        setError("Error loading profile");
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (!profile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "2rem auto", padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <nav style={{ background: "#2563eb", color: "white", padding: "1rem", fontSize: "1.2rem", textAlign: "center" }}>
        Navigation Bar
      </nav>
      <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div
          className={`avatar ${getRoleClass(profile.role)}`}
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#e5e7eb",
            borderRadius: "50%",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#374151",
            border: "2px solid #d1d5db",
          }}
        >
          {getInitials(profile.email)}
        </div>
        <div>
          <h2>{profile.email}</h2>
          <span className={`role ${profile.role.toLowerCase()}`} style={{ padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}>
            {profile.role}
          </span>
        </div>
      </div>
      <div className="details" style={{ fontSize: "0.9rem", color: "#374151" }}>
        <p>
          <span style={{ fontWeight: "600" }}>Staff ID:</span> {profile.staffId}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
