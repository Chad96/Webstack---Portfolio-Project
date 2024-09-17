import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with actual user ID
        const userId = "6a3c"; // This should be dynamic, based on logged-in user
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        // Convert base64 profile picture to displayable image
        if (response.data.profilePicture) {
          setProfilePicture(
            `data:image/png;base64,${response.data.profilePicture}`
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = {
        username,
        email,
        password, // Encrypt password if needed
        profilePicture: profilePicture
          ? btoa(profilePicture)
          : user.profilePicture,
      };

      await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate("/login");
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/src/assets/your-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent background
          zIndex: "1000",
        }}
      >
        <h3 style={{ margin: "0", paddingLeft: "20px" }}>Recipe Master</h3>
        <nav
          style={{
            padding: "0 20px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              textDecoration: "none",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            style={{
              textDecoration: "none",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "20px",
            }}
          >
            Logout
          </button>
        </nav>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: "80px", // Add padding to avoid overlap with header
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {editing ? (
            <form onSubmit={handleUpdate}>
              <h2 className="text-center mb-4">Edit Profile</h2>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setProfilePicture(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Update Profile
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-center mb-4">Profile</h2>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "75px",
                    }}
                  />
                )}
              </div>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
